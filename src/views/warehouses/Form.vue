<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container id="feed" grid-list-lg v-loading="loading" pl-0 pr-0>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              class="mx-auto"
              color="grey lighten-4"
              max-width="600"
            >
              <v-icon large color="grey" class="icon-placeholder display-4 py-2">
                mdi-image-filter-hdr
              </v-icon>
              <v-img :aspect-ratio="16 / 9" :src="warehouseImage">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out primary v-card--reveal display-3 white--text"
                  >
                    <v-layout align-center justify-center row fill-height>
                      <v-btn
                        flat
                        dark
                        fab
                        class="mt-4"
                        @click="isReadonly ? null : openDialog()"
                      >
                        <v-icon>camera</v-icon>
                      </v-btn>
                    </v-layout>
                  </div>
                </v-expand-transition>
              </v-img>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12 sm6>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                v-model="warehouse.name"
                :rules="rules.required"
                class="required"
                label="name"
                required
                :readonly="isReadonly"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                label="description"
                v-model="warehouse.description"
                :readonly="isReadonly"
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-combobox
                v-model="warehouse.location"
                :items="warehouse.location"
                label="location"
                chips
                clearable
                multiple
                :readonly="isReadonly"
              >
                <template v-slot:selection="data">
                  <v-chip :selected="data.selected" close>
                    {{ data.item }}
                  </v-chip>
                </template>
              </v-combobox>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout align-end justify-center pt-4>
        <v-btn
          color="primary darken-1"
          flat
          round
          :disabled="loading"
          :to="{ name: 'warehousesTable' }"
          >Cancel</v-btn
        >
        <v-btn
          color="primary"
          round
          :loading="loading"
          :disabled="!valid"
          @click.native="save"
          v-if="!isReadonly"
          >Save</v-btn
        >
      </v-layout>
    </v-container>
    <v-dialog scrollable persistent v-model="uploadDialog" full-width>
      <v-card v-loading="loading">
        <v-card-title>
          <span class="headline">Update Image</span>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <photo-cropper :options="photoOptions" :src.sync="imageSrc" />
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="pa-3">
          <v-spacer></v-spacer>
          <v-btn
            color="primary darken-1"
            flat
            round
            :disabled="loading"
            @click.native="close"
            >Close</v-btn
          >
          <v-btn color="primary" round :disabled="!cropped" @click.native="setImage"
            >Ok</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import PhotoCropper from "../../components/helpers/PhotoCropper";
import LocationPicker from "../../components/helpers/LocationPicker.vue";
import {
  newWarehouse,
  updateWarehouse,
  getWarehouse,
} from "../../api/warehouses/warehouses";

export default {
  components: { PhotoCropper, LocationPicker },
  data() {
    return {
      warehouseID: this.$route.params.id,
      imageSrc: "",
      warehouse: {
        name: null,
        description: null,
        location: null,
        image: "",
      },
      photoOptions: {
        width: 640,
        height: 360,
        boundaryWidth: 700,
        boundaryHeight: 400,
        circle: false,
      },

      // Form Rules
      uploadDialog: false,
      valid: false,
      loading: false,
      // loadingTags: false,
      rules: {
        required: [(v) => !!v || "This field is required"],
      },
      // =================
    };
  },
  mounted() {
    this.initData();
  },
  computed: {
    /**
     * Display image
     */
    warehouseImage() {
      return this.warehouse.image ? this.warehouse.image : "";
    },
    /**
     * Check if image has been cropped
     */
    cropped() {
      return this.imageSrc.length > 0;
    },
    /**
     * Check if user has access
     */
    isReadonly() {
      return !this.hasAccess(["write", "admin"]);
    },
  },
  methods: {
    /**
     * Load data from API
     */
    async initData() {
      try {
        this.loading = true;
        // this.loadingTags = true;
        // const tags = await getAllTags();
        // this.tags = tags.data.data;
        if (this.warehouseID) {
          const warehouse = await getWarehouse(this.warehouseID);
          this.warehouse = warehouse.data.data;
        }
      } catch (error) {
        this.notifyErrors(error);
      } finally {
        this.loading = false;
        // this.loadingTags = false;
      }
    },

    /**
     * Collect and save data
     */
    async save() {
      this.loading = true;
      let data = JSON.parse(JSON.stringify(this.warehouse));
      try {
        if (this.$refs.form.validate()) {
          if (this.warehouseID) {
            data._id = this.warehouseID;
            await updateWarehouse(data);
          } else {
            await newWarehouse(data);
          }
          this.$snotify.success("Data saved!", "Success");
          this.$router.push({ name: "warehousesTable" });
        }
      } catch (error) {
        this.notifyErrors(error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Open image modal and assign image to helper component
     * to be cropped.
     */
    openDialog() {
      this.uploadDialog = true;
      this.$nextTick(() => {
        this.imageSrc = this.warehouse.image;
      });
    },

    /**
     * Set image to main data from result of helper component
     */
    setImage() {
      this.warehouse.image = this.imageSrc;
      this.close();
    },

    /**
     * Reset image and close modal
     */
    close() {
      this.uploadDialog = false;
      this.imageSrc = "";
    },
  },
};
</script>
