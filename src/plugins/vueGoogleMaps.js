import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_API_KEY_GMAP, // Please provide Google Map API Key
    libraries: 'places', // necessary for places input
  },
});