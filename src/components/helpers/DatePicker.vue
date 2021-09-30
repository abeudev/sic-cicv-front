<!-- Usage -->
<!-- <DatePicker 
  :date.sync="startDate"
  :min="startDate"
  :max="endDate"
  :rules="rules.someRules"
  label="Start Date"
  className="someClasses" 
  :disabled="disabled"
></DatePicker> -->

<template>
  <v-menu
    :close-on-content-click="false"
    v-model="menuDate"
    lazy
    transition="fade-transition"
    offset-y
    full-width
    min-width="290px"
    max-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field 
        :value="displayDate" 
        :rules="rules" 
        :label="label" 
        :class="className" 
        :disabled="disabled"
        readonly
        v-on="readonly ? null : on "
      >
      </v-text-field>
      <v-text-field :value="date" class="hidden-screen-only"></v-text-field>
    </template>
    <v-date-picker 
      no-title 
      v-model="mainDate" 
      @input="menuDate = false" 
      :min="min ? $moment(min).format('YYYY-MM-DD') : null" 
      :max="max ? $moment(max).format('YYYY-MM-DD') : null">
    </v-date-picker>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DatePicker",
  props: ["date", "min", "max", "rules", "label", "required", "disabled", "className", "readonly"],
  data() {
    return {
      mainDate: null,
      menuDate: false,
      displayDate: null
    };
  },
  watch: {
    /**
     * Observe main data in vuetify datepicker
     * Set Displayed Date
     * Set timestamp and assign to date props
     */
    mainDate: function(value) {
      if (value) {
        this.displayDate = this.$moment(value, "YYYY-MM-DD").format(this.dateFormat);
        this.$emit("update:date", parseInt(this.$moment(value, 'YYYY-MM-DD').format('x')));
      }
    },
    /**
     * Observe date props
     * Get value and parse to match format of vuetify datepicker
     * Set Displayed Date
     */
    date: function(value) {
      if (value) {
        this.mainDate = this.$moment(value).format('YYYY-MM-DD');
        this.displayDate = this.$moment(value).format(this.dateFormat);
      }
    }
  },
  computed: {
    /**
     * Get Date format from store
     */
    ...mapGetters({timeAndRegion: "config/timeAndRegion"}),
    dateFormat() {
      if (this.timeAndRegion) return this.timeAndRegion.dateFormat;
      return 'DD-MM-YYYY';
    }
  },
  /**
   * Set initial date
   */
  created() {
    if (this.date) this.mainDate = this.$moment(this.date).format('YYYY-MM-DD');
  }
};
</script>