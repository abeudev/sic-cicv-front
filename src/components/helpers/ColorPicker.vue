<!-- Usage -->
<!-- <ColorPicker 
  :color.sync="color"
  label="Select Color"
  :rules="rules.someRules"
  className="someClasses"
  required
></ColorPicker> -->

<template>
  <v-menu
    :close-on-content-click="false"
    v-model="menuPicker"
    transition="fade-transition"
    offset-y
    max-width="220"
  >
    <template v-slot:activator="{ on }">
      <v-text-field 
        :class="className" 
        :value="displayText" 
        :rules="rules" 
        :label="label" 
        :disabled="disabled"
        readonly 
        v-on="readonly ? null : on "
      >
        <template v-slot:append>
          <v-icon :style="`color: ${displayText}`" medium>stop</v-icon>
        </template>
      </v-text-field>
    </template>
    <v-text-field :value="color" class="hidden-screen-only"></v-text-field>
    <chrome-picker v-model="colorModel" v-if="menuPicker" />
  </v-menu>
</template>

<script>
import { Sketch } from 'vue-color';
export default {
  name: "ColorPicker",
  props: ["color", "rules", "label", "required", "readonly", "disabled", "className"],
  components: { 'chrome-picker': Sketch },
  data() {
    return {
      colorModel: {},
      menuPicker: false,
      displayText: ""
    };
  },
  watch: {
    /**
     * Observer model for chrome-picker component
     * Set displayed text
     * Assign value to color props
     */
    colorModel: function(value) {
      if (value) {
        this.displayText = value.hex8;
        this.$emit("update:color", value.hex8);
      }
    },
    /**
     * Observe color props
     * Set value to model chrome-picker component
     * Set Displayed text
     */
    color: function(value) {
      this.colorModel.hex8 = value;
      this.displayText = value;
    }
  },
  created() {
    /**
     * Assign initial value
     */
    if (this.color) {
      this.colorModel.hex8 = this.color;
      this.displayText = this.color;
    }
  }
};
</script>