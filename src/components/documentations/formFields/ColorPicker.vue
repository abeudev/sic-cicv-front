<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container grid-list-lg pl-0 pr-0>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-layout row wrap>
            <v-flex xs12 class="pb-0">
              <h3>Common Use<code-usage :code="commonUsage"/></h3>
            </v-flex>
            <v-flex xs12 sm6>
              <ColorPicker 
                :color.sync="color"
                label="Select Color"
                :rules="rules"
                className="required"
                required
              ></ColorPicker>
            </v-flex>
            <v-flex xs12 sm6>
              <ColorPicker
                :color.sync="color"
                label="Readonly"
                :rules="rules"
                className="required"
                :readonly="true"
              ></ColorPicker>
            </v-flex>
            <v-flex xs12>
              <prism-editor :code="`Color: ${color}`" language="js" readonly/>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm6>
          <h3 class="my-2">Available Properties</h3>
          <p><i class="red--text">color</i> {<i class="primary--text">String</i>} ==> Main Value</p>
          <p><i class="red--text">label</i> {<i class="primary--text">String</i>} ==> Label</p>
          <p><i class="red--text">className</i> {<i class="primary--text">String</i>} ==> Set of css class. ex: "main color"</p>
          <p><i class="red--text">required</i> {<i class="primary--text">Boolean</i>} ==> The field is required</p>
          <p><i class="red--text">readonly</i> {<i class="primary--text">Boolean</i>} ==> The field is readonly</p>
          <p><i class="red--text">disabled</i> {<i class="primary--text">Boolean</i>} ==> The field is disabled</p>
          <p><i class="red--text">rules</i> {<i class="primary--text">Array of Func()</i>} ==> Set of input rules</p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import PrismEditor from 'vue-prism-editor';
import CodeUsage from "../../helpers/CodeUsage";
import ColorPicker from "../../helpers/ColorPicker";

export default {
  components: { PrismEditor, ColorPicker, CodeUsage },
  data() {
    return {
      color: null,
      valid: false,
      rules: [v => !!v || "This field is required"],

      // Code Example
      commonUsage: `
<ColorPicker 
  :color.sync="color"
  label="Select Color"
  :rules="rules"
  className="required"
  required
></ColorPicker>

export default {
  data() {
    return {
      color: null,
      valid: false,
      rules: [v => !!v || "This field is required"],
    }
  }
}
`
    };
  },
  computed: {
    dateRange() {
      return `Start Date: ${this.startDate} - End Date: ${this.endDate}`
    }
  }
};
</script>