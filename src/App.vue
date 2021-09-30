<template>
  <v-app id="genno">
    <component :is="layout">
      <router-view/>
    </component>
    <confirm ref="confirm"></confirm>
    <dialog-loader ref="dialogLoader"></dialog-loader>
    <vue-snotify></vue-snotify>
  </v-app>
</template>
<style src="./styles/base.scss" lang="scss"></style>
<script>
/**
 * Install layout and dialog
 */
import DialogLoader from "./components/helpers/DialogLoader";
import Confirm from "./components/helpers/Confirm";
const default_layout = "fullscreen";

export default {
  components: {
    Confirm,
    DialogLoader
  },
  computed: {
    /**
     * Read layout name from route.
     * Layout component is initialized in main.js file
     */
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  },
  beforeCreate() {
    // console.log(this.$vuetify)
  },
  mounted() {
    /**
     * Init Confirm dialog and dialog loader
     */
    this.$root.$confirm = this.$refs.confirm.open;
    this.$root.$dialogLoader = this.$refs.dialogLoader;
  }
};
</script>