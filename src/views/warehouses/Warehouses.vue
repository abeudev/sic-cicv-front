<template>
  <div class="page-layout">
    <g-breadcrumbs :items="breadcrumbs" />
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
          text: "Entrepôts",
          disabled: false,
          href: "#",
        },
      ],
      // =================
    };
  },
};
</script>
