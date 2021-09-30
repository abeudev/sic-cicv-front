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
import ServerSide from '../../../components/documentations/dataTable/ServerSide';
import ServerSideWithFilters from '../../../components/documentations/dataTable/ServerSideWithFilters';
import StaticData from '../../../components/documentations/dataTable/StaticData';
import StaticDataWithFilters from '../../../components/documentations/dataTable/StaticDataWithFilters';
Vue.component('server-side', ServerSide);
Vue.component('server-side-with-filters', ServerSideWithFilters);
Vue.component('static-data', StaticData);
Vue.component('static-data-with-filters', StaticDataWithFilters);

export default {
  data() {
    return {
      tabs: [
        {
          text: 'Server Side',
          name: 'server-side'
        },
        {
          text: 'Server Side and Filters',
          name: 'server-side-with-filters'
        },
        {
          text: 'Static Data',
          name: 'static-data'
        },
        {
          text: 'Static and Filters',
          name: 'static-data-with-filters'
        }
      ]
    };
  }
};
</script>