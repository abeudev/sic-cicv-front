<template>
  <div class="page-layout">
    <g-breadcrumbs :items="breadcrumbs" />
    <form-config :mainData.sync="mainData" :loading.sync="loading" v-loading="loading" />
  </div>
</template>

<script>
import Form from "./siteConfigurations/Form";
export default {
  components: { formConfig: Form },
  data() {
    return {
      // Breadcrumbs
      breadcrumbs: [
        {
          text: "Tableau de bord",
          disabled: false,
          href: "/",
        },
        {
          text: "Site Configurations",
          disabled: true,
          href: "#",
        },
      ],
      // Main
      mainData: {},
      loading: false,
    };
  },
};
</script>
