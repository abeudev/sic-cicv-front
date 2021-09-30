<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-layout row wrap>
      <v-flex xs12 class="pb-0">
        <h3>Readonly<code-usage :code="readonlyUsage"/></h3>
      </v-flex>
      <v-flex xs12 sm6>
        <location-picker :location="location" readonly />
      </v-flex>
      <v-flex xs12>
        <prism-editor :code="result" language="js" readonly/>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import PrismEditor from 'vue-prism-editor';
import CodeUsage from "../../helpers/CodeUsage";
import LocationPicker from "../../helpers/LocationPicker";

export default {
  components: { PrismEditor, LocationPicker,CodeUsage },
  data() {
    return {
      location: {
        lat: 35.6803997,
        lng: 139.7690174
      },
      valid: false,
      rules: [v => !!v || "Geo Location is required"],

      // Code Example
      readonlyUsage: `
<location-picker :location="location" readonly />

export default {
  data() {
    return {
      location: {
        lat: 35.6803997,
        lng: 139.7690174
      },
      valid: false,
      rules: [v => !!v || "This field is required"],
    }
  }
}
`
    };
  },
  computed: {
    result() {
      return JSON.stringify(this.location, null, '  ');
    }
  }
};
</script>