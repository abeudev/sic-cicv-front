<template>
  <div>
    <v-card class="mx-auto transparent pa-3" flat max-width="400">
      <v-card-text class="pt-0">
        <v-avatar id="profile-avatar" size="60%">
          <v-img :src="profilePicture" class="mb-4 elevation-10" v-if="mainData.useImage" />
          <g-avatar :value="mainData.avatar" className="mb-4 elevation-10" v-if="!mainData.useImage" />
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn 
                class="edit-photo-profile-btn" 
                icon 
                color="primary" 
                @click="uploadDialog = true"
                v-on="on"
              >
                <v-icon>camera_alt</v-icon>
              </v-btn>
            </template>
            <span>Update Photo</span>
          </v-tooltip>
        </v-avatar>
        <h3 class="headline">
          {{ mainData.firstName || "" }} {{ mainData.lastName || "" }}
        </h3>
        <div class="primary--text">{{ mainData.email || "" }}</div>
        <div class="primary--text subheading font-weight-bold">{{ mainData.username || "" }}</div>
      </v-card-text>
    </v-card>
    <!-- ============= Modal ============= -->
    <v-dialog scrollable persistent v-model="uploadDialog" max-width="980px">
      <v-card v-loading="loading" height="568px">
        <v-card-title>
          <span class="headline">Update Image</span>
          <v-spacer></v-spacer>
          <v-switch v-model="useImage" label="Use Image" class="justify-end"></v-switch>
        </v-card-title>
        <v-container grid-list-md class="pt-0 pb-0">
          <v-form ref="uploadForm" v-model="valid" lazy-validation>
            <v-layout row wrap>
              <v-flex xs12>
                <avatar-generator :value.sync="avatar" v-if="!useImage" />
                <photo-cropper :options="photoOptions" :src.sync="image" v-else />
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
        <v-card-actions class="pa-3">
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" flat round :disabled="loading" @click.native="close">Close</v-btn>
          <v-btn 
            color="primary" 
            round 
            :loading="loading" 
            :disabled="!valid" 
            @click.native="useImage ? uploadPhoto() : saveAvatar()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
/**
 * Import PhotoCropper and Avatar Generator from helper
 */
import { mapActions } from "vuex";
import PhotoCropper from "../../../components/helpers/PhotoCropper";
import AvatarGenerator from "../../../components/helpers/AvatarGenerator";
import { updateMyProfile, updateMyProfileImage } from "../../../api/userManagement/users";

export default {
  props: ["mainData"],
  components: { PhotoCropper, AvatarGenerator },
  data() {
    return {
      image: null,
      avatar: null,
      useImage: false,
      photoOptions: {
        width: 250,
        height: 250,
        boundaryHeight: 345,
        circle: false
      },
      uploadDialog: false,
      loading: false,
      valid: false
    }
  },
  computed: {
    /**
     * Get the image format wether avatar or png image.
     * If use image then add a param version to get the latest image state,
     * else is avatar string
     */
    profilePicture() {
      return !this.mainData.useImage ? this.mainData.avatar : this.mainData.image ? `${this.mainData.image}?v=${this.$moment().format("x")}` : '';
    }
  },
  watch: {
    /**
     * Observe upload dialog,
     * Set or unset the image and avatar
     */
    uploadDialog: function(val) {
      if (val) {
        this.image = `${this.mainData.image}?v=${this.$moment().format("x")}`;
        this.avatar = this.mainData.avatar;
      } else {
        this.image = null;
        this.avatar = null;
      }
    },
    /**
     * If useImage and Upload Dialog open, add param version
     */
    "mainData.useImage": function(val) {
      this.useImage = val;
    },
    "useImage": function(val) {
      if (val && this.uploadDialog) {
        this.image = `${this.mainData.image}?v=${this.$moment().format("x")}`;
      }
    }
  },
  methods: {
    /**
     * Import action from Vuex Store
     */
    ...mapActions({ setProfile: "user/setProfile" }),
    /**
     * Upload Image Photo and save to Vuex Store
     */
    async uploadPhoto() {
      this.loading = true;
      let data = { image: this.image };

      try {
        const user = await updateMyProfileImage(data);
        this.$emit("update:mainData", user.data.data);
        this.setProfile(user.data.data);
        this.mainData.useImage = this.useImage;
        return this.$snotify.success("Data saved!", "Success");
      } catch (error) {
        this.notifyErrors(error);
      } finally {
        this.loading = false;
        this.close();
      }
    },
    /**
     * Save Avatar and save to Vuex Store
     */
    async saveAvatar() {
      this.loading = true;
      let data = { 
        avatar: this.avatar,
        useImage: false
      };
      let cloneMainData = {...this.mainData};

      try {
        const user = await updateMyProfile(data);
        cloneMainData.avatar = user.data.data.avatar;
        cloneMainData.useImage = user.data.data.useImage;
        this.$emit("update:mainData", cloneMainData);
        this.setProfile(cloneMainData);
        this.mainData.useImage = this.useImage;
        return this.$snotify.success("Avatar saved!", "Success");
      } catch (error) {
        this.notifyErrors(error);
      } finally {
        this.loading = false;
        this.close();
      }
    },
    close() {
      this.uploadDialog = false;
    }
  }
}
</script>
