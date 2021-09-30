<template>
  <div class="page-layout">
    <g-breadcrumbs :items="breadcrumbs" />
    <v-tabs class="g-tabs" slider-color="secondary">
      <v-tab :to="{ name: 'colisTable' }">Colis</v-tab>
      <v-tab v-if="hasPermission('colisCompleted')" :to="{ name: 'colisCompleted' }"
        >Envoi de Colis status: terminés
      </v-tab>
      <v-tab v-if="hasPermission('colisPending')" :to="{ name: 'colisPending' }"
        >Envoi de Colis status: Annulés
      </v-tab>
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
          text: "Colis",
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
