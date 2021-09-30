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
import Requirements from '../../../components/documentations/quickStart/Requirements';
import Structure from '../../../components/documentations/quickStart/Structure';
import Libraries from '../../../components/documentations/quickStart/Libraries';
import Features from '../../../components/documentations/quickStart/Features';
import MixinsHelper from '../../../components/documentations/quickStart/MixinsHelper';
Vue.component('requirements', Requirements);
Vue.component('structure', Structure);
Vue.component('libraries', Libraries);
Vue.component('features', Features);
Vue.component('mixinsHelper', MixinsHelper);

export default {
  data() {
    return {
      tabs: [
        {
          text: 'Requirements',
          name: 'requirements'
        },
        {
          text: 'Structure',
          name: 'structure'
        },
        {
          text: 'Libraries',
          name: 'libraries'
        },
        {
          text: 'Features',
          name: 'features'
        },
        {
          text: 'Mixins Helper',
          name: 'mixinsHelper'
        }
      ]
    };
  }
};
</script>