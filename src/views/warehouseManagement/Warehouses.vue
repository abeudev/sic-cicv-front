<template>
  <div class="page-layout">
    <g-breadcrumbs :items="breadcrumbs" />
    <v-tabs class="g-tabs" slider-color="secondary">
      <v-tab :to="{ name: 'warehouseTable' }">Entrepôt</v-tab>
      <v-tab v-if="hasPermission('warehousePending')" :to="{ name: 'warehousePending' }"
        >Entrepôt en attente</v-tab
      >
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
          text: "Entrepôt",
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
