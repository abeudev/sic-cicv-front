<!-- Usage -->
<!-- phoneNumber: {
  countryCode: "+62",
  number: ""
}, -->
<!-- <PhoneNumber 
  :value.sync="phoneNumber"
  label="Phone Number"
  placeholder="81213224xxx"
  className="someClasses" 
  :rules="rules.phoneNumber"
  required
></PhoneNumber> -->

<template>
  <v-layout row wrap>
    <v-flex xs6>
      <v-autocomplete
        :items="countryCodes"
        v-model="model.countryCode"
        label="Code"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs6>
      <v-text-field
        v-model="model.number"
        :label="label"
        type="number"
        min="0"
        :placeholder="placeholder"
        :rules="rules"
        :class="className"
        :required="required"
        :readonly="readonly"
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
import countryCodes from 'country-codes-list';
export default {
  name: "PhoneNumber",
  props: ["value", "rules", "label", "required", "disabled", "readonly", "className", "placeholder"],
  data() {
    return {
      countryCodes: [],
      model: {
        countryCode: "+62",
        number: null
      }
    };
  },
  created() {
    this.countryCodes = countryCodes.customArray({ name: '{countryNameEn}', value: `+{countryCallingCode}`, text: `{countryNameEn} (+{countryCallingCode})`});
    this.model = JSON.parse(JSON.stringify(this.value));
  },
  watch: {
    model: {
      handler(value) {
        this.$emit('update:value', value);
      },
      deep: true
    },
    value: {
      handler(value) {
        this.model = value;
      },
      deep: true
    }
  }
};
</script>