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
        <avatar-generator :value.sync="avatar" />
      </v-flex>
      <v-flex xs12>
        <prism-editor :code="avatar" language="json" readonly/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PrismEditor from 'vue-prism-editor';
import AvatarGenerator from '../../../components/helpers/AvatarGenerator';
import CodeUsage from "../../../components/helpers/CodeUsage";

export default {
  components: { PrismEditor, AvatarGenerator, CodeUsage },
  data() {
    return {
      avatar: null,

      // Code Example
      sampleCode: `
<avatar-generator :value.sync="avatar" />

export default {
  data() {
    return {
      avatar: null
    }
  }
}
`
    };
  }
};
</script>