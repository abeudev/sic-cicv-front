<template>
  <div>
    <DataTable :table="table" ref="assetsTable" />
    <v-dialog scrollable persistent v-model="uploadDialog" full-width>
      <v-card>
        <v-card-title>
          <span class="headline">Upload Files</span>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <multi-upload
                ref="uploadForm"
                :url="url"
                :filters="filters"
                :error.sync="error"
                :uploadedFiles.sync="uploadedFiles"
                :loading.sync="loading"
              />
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="pa-3">
          <v-spacer></v-spacer>
          <v-btn
            color="primary darken-1"
            flat
            round
            @click.native="close"
            :disabled="loading"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import plupload from "plupload";
import { deleteItem } from "../../../components/helpers/jsUtills/jsAction";
import { deleteRowTable } from "../../../api/utilities/datatable";
import DataTable from "../../../components/helpers/DataTable";
import MultiUpload from "../../../components/helpers/MultiUpload";

export default {
  components: { DataTable, MultiUpload },
  data() {
    return {
      uploadDialog: false,
      loading: false,
      // File Uploader options
      url: "assets/uploads",
      filters: {
        max_file_size: "100kb",
        prevent_duplicates: false,
        mime_types: [
          { title: "Image files", extensions: "jpg,jpeg,png" },
          { title: "Zip files", extensions: "zip" },
        ],
      },
      uploadedFiles: [],
      error: [],
      // End of File Uploader options
      table: {
        title: "Files Table",
        toolbar: {
          search: true,
          selectAll: true,
          daterange: {
            display: false,
            fieldName: "createdAt",
          },
          topRightButtons: [
            {
              text: "Add File",
              icon: "add",
              isVisible: () => this.hasAccess(["write", "admin"]),
              action: () => {
                this.uploadDialog = true;
              },
            },
            {
              text: "Delete Selected files",
              icon: "clear_all",
              isVisible: () => this.hasAccess(["admin"]),
              action: () => {
                this.removeSelected();
              },
            },
          ],
        },
        settings: {
          url: "assets/table",
          isServerSide: true,
          pagination: {
            sortBy: "createdAt",
            descending: true,
            rowsPerPage: 25,
          },
        },
        headers: [
          { text: "File Name", align: "left" },
          { text: "Type" },
          { text: "Size" },
          { text: "File Path" },
          { text: "Username" },
          { text: "Created At" },
        ],
        contents: [
          { data: "originalname" },
          { data: "mimetype" },
          {
            data: "size",
            render: (data) => {
              return plupload.formatSize(data);
            },
          },
          {
            data: "path",
            render: (data) => {
              return `<a href="${data}" target="_blank" class="blue--text text-lowercase theme--dark v-btn v-btn--depressed v-btn--outline v-btn--round v-btn--small">
                    <div class="v-btn__content">Download</div>
                  </a>`;
            },
          },
          { data: "user.username" },
          {
            data: "createdAt",
            render: (data) => {
              return this.timeZone(data, "DD MMM YYYY H:mm z");
            },
          },
        ],
        actions: [
          {
            text: "View File",
            icon: "remove_red_eye",
            color: "orange",
            isVisible: () => this.hasAccess(["read", "write", "admin"]),
            getRecord: (data) => {
              alert(JSON.stringify(data, null, "  "));
            },
          },
          {
            text: "Delete File",
            icon: "delete",
            color: "red accent-2",
            isVisible: () => this.hasAccess(["admin"]),
            getRecord: async (data) => {
              const deleted = await deleteItem(this, "assets", data._id);
              if (deleted) this.$refs.assetsTable.refreshTable();
            },
          },
        ],
      },
    };
  },
  methods: {
    /**
     * Delete seleceted file
     */
    async removeSelected() {
      const files = JSON.parse(JSON.stringify(this.table.selected));
      if (files.length < 1) return this.$snotify.error("Please select a file", "Error");
      const del = await this.$root.$confirm(
        "Delete?",
        "Are you sure you want to delete selected files?",
        { color: "error lighten-1" }
      );
      try {
        if (del) {
          this.$root.$dialogLoader.show("Please wait...", { color: "primary" });
          const deleteFiles = files.map((file) => {
            const url = "assets/" + file._id;
            return deleteRowTable(url);
          });
          await Promise.all(deleteFiles);
          this.$root.$dialogLoader.hide();
          this.$refs.assetsTable.refreshTable();
          this.$snotify.success("All files deleted", "Success");
        }
      } catch (error) {
        this.$snotify.error("Failed to delete file!", "Error");
        this.$root.$dialogLoader.hide();
      }
    },
    /**
     * Clear files and cache in uploader helper
     */
    close() {
      this.$refs.uploadForm.clearFiles();
      this.uploadDialog = false;
    },
  },
  computed: {
    errors() {
      const errors = this.error.map((err) => {
        return {
          code: err.code,
          message: err.message,
          fileName: err.file.name,
          fileType: err.file.type,
        };
      });
      return errors;
    },
  },

  watch: {
    uploadedFiles: function (val) {
      this.$refs.assetsTable.refreshTable();
    },
  },
};
</script>
