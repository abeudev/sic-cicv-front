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
              <TimePicker
                label="Time of Whatever"
                :time.sync="time"
                :rules="rules"
                className="required"
                required
              />
            </v-flex>
            <v-flex xs12>
              <prism-editor :code="`Time Selected: ${time}`" language="js" readonly/>
            </v-flex>

            <v-flex xs12 class="mt-3 pb-0">
              <h3>Time Range<code-usage :code="timeRangeUsage"/></h3>
            </v-flex>
            <v-flex xs12 sm6>
              <TimePicker
                label="Start Time"
                :time.sync="startTime"
                :rules="rules"
                :max="endTime"
                className="required"
                required
              />
            </v-flex>
            <v-flex xs12 sm6>
              <TimePicker
                label="End Time"
                :time.sync="endTime"
                :rules="rules"
                :min="startTime"
                className="required"
                required
              />
            </v-flex>
            <v-flex xs12>
              <prism-editor :code="timeRange" language="js" readonly/>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm6>
          <h3 class="my-2">Available Properties</h3>
          <p><i class="red--text">time</i> {<i class="primary--text">String</i>} ==> Main Value</p>
          <p><i class="red--text">min</i> {<i class="primary--text">String</i>} ==> Min time selected</p>
          <p><i class="red--text">max</i> {<i class="primary--text">String</i>} ==> Max time selected</p>
          <p><i class="red--text">label</i> {<i class="primary--text">String</i>} ==> Label</p>
          <p><i class="red--text">className</i> {<i class="primary--text">String</i>} ==> Set of css class. ex: "main time"</p>
          <p><i class="red--text">required</i> {<i class="primary--text">Boolean</i>} ==> The field is required</p>
          <p><i class="red--text">readonly</i> {<i class="primary--text">Boolean</i>} ==> The field is readonly</p>
          <p><i class="red--text">disabled</i> {<i class="primary--text">Boolean</i>} ==> The field is disabled</p>
          <p><i class="red--text">rules</i> {<i class="primary--text">Array of Func()</i>} ==> Set of input rules</p>
          <p><i class="red--text">allowedHours</i> {<i class="primary--text">Array of Func()</i>} ==> Allowed hours. Ex: <code>allowedHours: v => v % 2</code></p>
          <p><i class="red--text">allowedMinutes</i> {<i class="primary--text">Array of Func()</i>} ==> Allowed minutes. Ex: <code>allowedMinutes: v => v >= 10 && v <= 50</code></p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import PrismEditor from 'vue-prism-editor';
import CodeUsage from "../../helpers/CodeUsage";
import TimePicker from "../../helpers/TimePicker";

export default {
  components: { PrismEditor, TimePicker, CodeUsage },
  data() {
    return {
      time: "",
      startTime: "",
      endTime: "",
      valid: false,
      rules: [v => !!v || "This field is required"],

      // Code Example
      commonUsage: `
<TimePicker
  label="Time of Whatever"
  :time.sync="time"
  :rules="rules"
  className="required"
  required
/>

export default {
  data() {
    return {
      time: "",
      valid: false,
      rules: [v => !!v || "This field is required"],
    }
  }
}
`,
      timeRangeUsage: `
<TimePicker
  label="Start Time"
  :time.sync="startTime"
  :rules="rules"
  :max="endTime"
  className="required"
  required
/>

<TimePicker
  label="End Time"
  :time.sync="endTime"
  :rules="rules"
  :min="startTime"
  className="required"
  required
/>

export default {
  data() {
    return {
      startTime: "",
      endTime: "",
      valid: false,
      rules: [v => !!v || "This field is required"],
    }
  }
}
`
    };
  },
  computed: {
    timeRange() {
      return `Start Time: ${this.startTime} - End Time: ${this.endTime}`
    }
  }
};
</script>