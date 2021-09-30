<template>
  <div class="page-layout">
    <g-breadcrumbs :items="breadcrumbs" />
    <v-tabs class="g-tabs" slider-color="secondary">
      <v-tab :to="{ name: 'deliveryManTable' }">Livreurs</v-tab>
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
          text: "Livreurs",
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
