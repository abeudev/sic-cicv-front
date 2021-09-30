<template>
  <v-tabs class="g-tabs" slider-color="primary">
    <v-tab v-for="tab in tabs" :key="tab.name">{{ tab.text }}</v-tab>
    <v-tab-item v-for="tab in tabs" :key="tab.name">
      <component :is="tab.name" />
    </v-tab-item>
  </v-tabs>
</template>

<script>
import Vue from 'vue';
import DatePicker from '../../../components/documentations/formFields/DatePicker';
import TimePicker from '../../../components/documentations/formFields/TimePicker';
import ColorPicker from '../../../components/documentations/formFields/ColorPicker';
Vue.component('date-picker', DatePicker);
Vue.component('time-picker', TimePicker);
Vue.component('color-picker', ColorPicker);

export default {
  data() {
    return {
      tabs: [
        {
          text: 'Date Picker',
          name: 'date-picker'
        },
        {
          text: 'Time Picker',
          name: 'time-picker'
        },
        {
          text: 'Color Picker',
          name: 'color-picker'
        }
      ]
    };
  }
};
</script>