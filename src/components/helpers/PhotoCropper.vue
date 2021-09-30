<template>
  <v-layout row wrap align-center justify-center fill-height>
    <v-flex xs12 sm8>
      <vue-croppie 
        ref="croppieRef" 
        :enableExif="true"
        :enableOrientation="true"
        :viewport="{ width: options.width, height: options.height, type: options.circle ? 'circle' : '' }"
        :boundary="{ width: options.boundaryWidth, height: options.boundaryHeight }"
        @result="result"
        @update="update">
      </vue-croppie>
    </v-flex>
    <v-flex xs12 sm4 class="text-xs-center">
      <!-- the result -->
      <img :src="cropped" width="200" class="d-block mx-auto" />
      <input type="file" @change="onFileChange" accept="image/*" class="d-block mx-auto pt-3 cropper-file-input"/>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["options", "src"],
  data() {
    return {
      cropped: null,
      imgUrl: null
    }
  },
  watch: {
    /**
     * Init image on src changes
     */
    src: function(val) {
      this.initImage();
    }
  },
  mounted() {
    this.initImage();
  },
  methods: {
    /**
     * Bind Image
     */
    initImage() {
      if (!this.src) this.imgUrl = null;
      if (this.src && !this.imgUrl) {
        const isUrlImg = this.src.substr(0, 4) == 'http';
        if (isUrlImg) {
          this.imgUrl = this.src;
          setTimeout(() => {
            this.bind(this.imgUrl);
          }, 500);
        }
      }
    },
    /**
     * Read image on change
     * @param {Event} e
     */
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    /**
     * Read Image
     * @param {File} file
     */
    createImage(file) {
      let reader = new FileReader();
      
      reader.onload = (e) => {
        this.cropped = e.target.result;
        this.bind(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    /**
     * Bind Image to vue-cropie
     * @param {String} img
     */
    bind(url) {
      this.$refs.croppieRef.bind({ url });
    },
    crop() {
      /**
       * Here we are getting the result via callback function
       * and set the result to this.cropped which is being 
       * used to display the result above.
       */
      let options = {
        format: 'png'
      }
      this.$refs.croppieRef.result(options, (output) => {
        this.cropped = output;
        this.$emit("update:src", output);
      });
    },
    result(output) {
      this.cropped = output;
    },
    update: _.debounce(function(val) {
      this.crop();
    }, 500)
  }
}
</script>
