<!-- Usage -->
<!-- <TimePicker 
  :time.sync="startTime" 
  v-model="startTime" 
  :min="startTime"
  :max="endTime"
  :rules="rules.someRules"
  className="someClasses"
  label="Start Time"
></TimePicker> -->

<template>
  <v-menu
    ref="menu"
    v-model="menu2"
    :close-on-content-click="false"
    :return-value.sync="mainTime"
    lazy
    transition="fade-transition"
    offset-y
    full-width
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="time"
        :label="label"
        :rules="rules"
        :class="className" 
        prepend-icon="access_time"
        readonly
        v-on="readonly ? null : on "
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="menu2"
      v-model="mainTime"
      full-width
      @click:minute="$refs.menu.save(mainTime)"
      :format="timeFormat"
      :min="min"
      :max="max"
      :allowed-hours="allowedHours"
      :allowed-minutes="allowedMinutes"
    ></v-time-picker>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TimePicker",
  props: ["time", "min", "max", "rules", "label", "required", "allowedHours", "allowedMinutes", "readonly", "className"],
  data() {
    return {
      mainTime: null,
      menu2: false
    };
  },
  watch: {
    /**
     * Observe mainTime in vuetify timepicker
     * Set value to time props
     */
    mainTime: function(value) {
      this.$emit("update:time", value);
    },
    /**
     * Observe time props
     * Set value to mainTime
     */
    time: function(value) {
      this.mainTime = value;
    }
  },
  computed: {
    /**
     * Import time format from store
     */
    ...mapGetters({timeAndRegion: "config/timeAndRegion"}),
    timeFormat() {
      if (this.timeAndRegion) return this.timeAndRegion.timeFormat;
      return '24hr';
    }
  },
  mounted() {
    if (this.time) {
      this.mainTime = this.time;
    } else {
      this.mainTime = null;
    }
  }
}
</script>