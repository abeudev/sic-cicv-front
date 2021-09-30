<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-alert
        :value="true"
        color="grey"
        outline
        class="mb-3"
        v-html="filtersDisplay"
      />
    </v-flex>
    <v-flex xs12>
      <DataTable :table="table" />
    </v-flex>
  </v-layout>
</template>

<script>
  import Vue from 'vue';
  import { mapGetters } from 'vuex';
  import plupload from 'plupload';
  import DataTable from "./DataTable";

  export default {
    props: ['url', 'filters', 'error', 'loading', 'uploadedFiles'],
    components: { DataTable },
    computed: {
      ...mapGetters({
        token: 'auth/token',
        miniVariant: "template/miniVariant"
      }),
      filtersDisplay() {
        const filters = Object.keys(this.filters);
        const fileTypes = [];
        const text = filters.map(filter => {
          let title = `<b>${this._.startCase(filter)}</b>`
          let txt = `${title}: ${this.filters[filter]}`;
          if (filter == 'mime_types') {
            const types = this.filters[filter].map(type => {
              let txtType = `(${type.title}: ${type.extensions})`;
              return txtType;
            });
            txt = `${title}: ${types.join(', ')}`;
          }
          return txt;
        });
        return text.join(',&nbsp;');
      }
    },
    data() {
      return {
        /**
         * Main Data to bind Uploader
         */
        uploader: null,
        files: [],
        errors: [],
        /**
         * Plupload Filter Optioins
         */
        defaultFilters: {
          max_file_size : '100kb',
          prevent_duplicates: false,
          mime_types : []
        },
        /**
         * Datatable Options
         */
        table: {
          title: 'Files Upload Table',
          toolbar: {
            search: true,
            daterange: {
              display: false,
              fieldName: 'createdAt'
            },
            topRightButtons: [
              {
                text: "Add Files",
                icon: "add",
                isVisible: () => true,
                id: "addFile"
              },
              {
                text: "Clear Files",
                icon: "clear_all",
                isVisible: () => true,
                action: () => {
                  this.clearFiles();
                }
              },
              {
                text: "Start Upload",
                icon: "cloud_upload",
                isVisible: () => true,
                action: () => {
                  if (this.uploader.files.length < 1) return null;
                  this.startUpload();
                }
              }
            ]
          },
          settings: {
            loading: false,
            data: [],
            pagination: {
              sortBy: 'lastModified',
              descending: true,
              rowsPerPage: 25
            }
          },
          headers: [
            { text: "Name", align: "left" },
            { text: "Type" },
            { text: "Size" },
            { text: "Status" },
            { text: "Last Modified" }
          ],
          contents: [
            { data: "name" },
            { data: "type" },
            { data: "size" },
            { 
              data: "percent",
              render: data => {
                return data + '%';
              }
            },
            { data: "lastModified" }
          ],
          actions: [
            {
              text: "File Info",
              icon: "info",
              color: "grey lighten-1",
              getRecord: data => {
                alert(JSON.stringify(data, null, '  '));
              }
            },
            {
              text: "Remove from Queue",
              icon: "delete",
              color: "red accent-2",
              getRecord: data => {
                this.removeFile(data);
              }
            }
          ]
        }
      }
    },
    methods:{
      /**
       * Init Plupload
       */
      load() {
        /**
         * Setting Uploader and Headers
         */
        this.uploader = new plupload.Uploader({
          browse_button: 'addFile',
          url: process.env.VUE_APP_API_BASE_URL + this.url,
          filters: this.filters ? this.filters : this.defaultFilters,
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        
        this.uploader.init();
        
        /**
         * Listen on FilesAdded Event
         * Fill the list of file that will be uploaded
         */
        this.uploader.bind('FilesAdded', (up, files) => {
          plupload.each(files, (file) => {
            const data = {
              id: file.id,
              name: file.name,
              lastModified: this.timeZone(file.lastModifiedDate, 'DD MMM YYYY H:mm z'),
              type: file.type,
              percent: file.percent,
              size: plupload.formatSize(file.size)
            }
            data.icon = 'assignment';
            data.iconClass = 'blue white--text';
            this.files.push(data);
            this.table.settings.data = JSON.parse(JSON.stringify(this.files));
          });
        });

        /**
         * Listen on FilesRemoved Event
         * Update table content
         */
        this.uploader.bind('FilesRemoved', (up, files) => {
          const id = files[0].id;
          const newState = this.files.filter(file => file.id != id);
          this.files = JSON.parse(JSON.stringify(newState));
          this.table.settings.data = JSON.parse(JSON.stringify(this.files));
        });
        
        /**
         * Listen on BeforeUpload Event
         * Raise loading state
         */
        this.uploader.bind('BeforeUpload', (up, file) => {
          this.table.settings.loading = true;
          this.$emit('update:loading', true);
        });

        /**
         * Listen on UploadProgress Event
         * Set progress percentage and update table
         */
        this.uploader.bind('UploadProgress', (up, file) => {
          this.files.find(item => item.id == file.id).percent = file.percent;
          this.table.settings.data = JSON.parse(JSON.stringify(this.files));
        });
        
        /**
         * Listen on Error Event
         * Catch error, close loading state
         */
        this.uploader.bind('Error', (up, err) => {
          this.table.settings.loading = false;
          this.errors.push(err);
          this.$emit('update:loading', false);
          this.$emit('update:error', this.errors);
          this.$snotify.error(err.message, "Error");
        });

        /**
         * Listen on FileUploaded Event
         * Remove from uploader and cache
         */
        this.uploader.bind('FileUploaded', (up, file) => {
          this.removeFile(file)
        });

        /**
         * Listen on UploadComplete Event
         * Close loading state, get uploaded files data
         */
        this.uploader.bind('UploadComplete', (up, files) => {
          this.table.settings.loading = false;
          this.$emit('update:loading', false);
          this.$emit('update:uploadedFiles', files);
          this.$snotify.success("Upload operation complete", "Success");
        });
      },

      /**
       * Start upload by Plupload
       */
      startUpload() {
        this.uploader.start();
      },

      /**
       * Remove file and caches
       */
      removeFile(data) {
        this.uploader.removeFile(data);
      },

      /**
       * Clear all files and cache from list
       */
      clearFiles() {
        this.files.forEach(file => {
          this.removeFile(file);
          const newState = this.files.filter(item => item.id != file.id);
          this.files = JSON.parse(JSON.stringify(newState));
          this.table.settings.data = JSON.parse(JSON.stringify(this.files));
        });
      },

      /**
       * Destroy uploader
       */
      destroy() {
        this.clearFiles();
        this.uploader.unbindAll();
        this.uploader.destroy();
      }
    },

    mounted() {
      /**
       * Load Plupload on Mounted
       */
      Vue.nextTick(() => {
        this.load();
      });
    },

    /**
     * Clean up before destroy component
     */
    beforeDestroy() {
      this.destroy();
    }
  }
</script>