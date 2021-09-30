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
        <multi-upload :url="url" :filters="filters" :error.sync="error" />
      </v-flex>
      <v-flex xs12>
        <h3>Error Reponses - Do something to handle Errors (ex: show notification, etc)</h3>
        <prism-editor :code="errors" language="js" readonly/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PrismEditor from 'vue-prism-editor';
import MultiUpload from '../../../components/helpers/MultiUpload';
import CodeUsage from "../../../components/helpers/CodeUsage";

export default {
  components: { PrismEditor, MultiUpload, CodeUsage },
  data() {
    return {
      url: 'uploads',
      filters: {
        max_file_size: '2mb',
        prevent_duplicates: false,
        mime_types: [
          { title: "Image files", extensions: "jpg,jpeg,png" },
          { title: "Zip files", extensions: "zip" }
        ]
      },
      error: [],

      // Code Example
      sampleCode: `
<multi-upload 
  :url="url" 
  :filters="filters" 
  :error.sync="error" 
/>

export default {
  data() {
    return {
      url: 'uploads',
      filters: {
        max_file_size: '5mb',
        prevent_duplicates: false,
        mime_types: [
          { title: "Image files", extensions: "jpg,jpeg,png" },
          { title: "Zip files", extensions: "zip" }
        ]
      },
      error: []
    }
  }
}
`
    };
  },
  computed: {
    errors() {
      const errors = this.error.map(err => {
        return {
          code: err.code,
          message: err.message,
          fileName: err.file.name,
          fileType: err.file.type
        };
      });
      return JSON.stringify(errors, null, '  ');
    }
  }
};
</script>