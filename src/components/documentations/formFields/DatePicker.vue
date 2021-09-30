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
              <DatePicker
                label="Date of Birth"
                :date.sync="dateOfBirth"
                :rules="rules"
                className="required"
                required
              />
            </v-flex>
            <v-flex xs12>
              <prism-editor :code="`Date of Birth: ${dateOfBirth}`" language="js" readonly/>
            </v-flex>

            <v-flex xs12 class="mt-3 pb-0">
              <h3>Date Range<code-usage :code="dateRangeUsage"/></h3>
            </v-flex>
            <v-flex xs12 sm6>
              <DatePicker
                label="Start Date"
                :date.sync="startDate"
                :rules="rules"
                :max="endDate"
                className="required"
                required
              />
            </v-flex>
            <v-flex xs12 sm6>
              <DatePicker
                label="End Date"
                :date.sync="endDate"
                :rules="rules"
                :min="startDate"
                className="required"
                required
              />
            </v-flex>
            <v-flex xs12>
              <prism-editor :code="dateRange" language="js" readonly/>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm6>
          <h3 class="my-2">Available Properties</h3>
          <p><i class="red--text">date</i> {<i class="primary--text">Timestamp</i>} ==> Main Value</p>
          <p><i class="red--text">min</i> {<i class="primary--text">Timestamp</i>} ==> Min date selected</p>
          <p><i class="red--text">max</i> {<i class="primary--text">Timestamp</i>} ==> Max date selected</p>
          <p><i class="red--text">label</i> {<i class="primary--text">String</i>} ==> Label</p>
          <p><i class="red--text">className</i> {<i class="primary--text">String</i>} ==> Set of css class. ex: "main date"</p>
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
import DatePicker from "../../helpers/DatePicker";

export default {
  components: { PrismEditor, DatePicker, CodeUsage },
  data() {
    return {
      dateOfBirth: null,
      startDate: null,
      endDate: null,
      valid: false,
      rules: [v => !!v || "This field is required"],

      // Code Example
      commonUsage: `
<DatePicker
  label="Date of Birth"
  :date.sync="dateOfBirth"
  :rules="rules"
  className="required"
  required
/>

export default {
  data() {
    return {
      dateOfBirth: null,
      valid: false,
      rules: [v => !!v || "This field is required"],
    }
  }
}
`,    dateRangeUsage: `
<DatePicker
  label="Start Date"
  :date.sync="startDate"
  :rules="rules"
  :max="endDate"
  className="required"
  required
/>

<DatePicker
  label="End Date"
  :date.sync="endDate"
  :rules="rules"
  :min="startDate"
  className="required"
  required
/>

export default {
  data() {
    return {
      startDate: null,
      endDate: null,
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