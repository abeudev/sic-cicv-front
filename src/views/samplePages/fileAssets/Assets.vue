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
          text: "Dashboard",
          disabled: false,
          href: "#"
        },
        {
          text: "Assets",
          disabled: false,
          href: "#"
        }
      ]
      // =================
    };
  }
};
</script>