<template>
  <v-container grid-list-lg pa-0>
    <v-layout row wrap>
      <v-flex xs12>
        <v-alert
          :value="true"
          color="info"
          icon="info"
          outline
          class="mt-3 py-0"
        >
          Please open the file for more details. See the sample codes here
          <code-usage :code="sampleCode" />
        </v-alert>
      </v-flex>
      <v-flex xs12>
        <photo-cropper :options="options" :src.sync="image" />
      </v-flex>
      <v-flex xs12>
        <prism-editor :code="result" language="json" readonly/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PrismEditor from 'vue-prism-editor';
import PhotoCropper from '../../../components/helpers/PhotoCropper';
import CodeUsage from "../../../components/helpers/CodeUsage";

export default {
  components: { PrismEditor, PhotoCropper, CodeUsage },
  data() {
    return {
      image: null,
      options: {
        width: 350,
        height: 350,
        boundaryHeight: 400,
        circle: false
      },

      // Code Example
      sampleCode: `
<photo-cropper 
  :options="options" 
  :src.sync="image" 
/>

export default {
  data() {
    return {
      image: null,
      options: {
        width: 350,
        height: 350,
        boundaryHeight: 400,
        circle: false
      }
    }
  }
}
`
    };
  },
  computed: {
    result() {
      const result = this.image;
      if (result) return result.substr(0, 300) + '.....';
      return null;
    }
  }
};
</script>