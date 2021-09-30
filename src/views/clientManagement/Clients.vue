<template>
  <div class="page-layout">
    <g-breadcrumbs :items="breadcrumbs" />
    <v-tabs class="g-tabs" slider-color="secondary">
      <v-tab :to="{ name: 'clientTable' }">Clients</v-tab>
    </v-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Breadcrumbs
      breadcrumbs: [
        {
          text: "Tableau de bord",
          disabled: false,
          href: "#",
        },
        {
          text: "Clients",
          disabled: true,
          href: "#",
        },
      ],
      // =================
    };
  },
  mounted() {},
  methods: {},
};
</script>
