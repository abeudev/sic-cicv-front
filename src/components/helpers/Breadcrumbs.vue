<template>
  <v-breadcrumbs :items="items" class="pl-0">
    <v-icon slot="divider">{{dividerIcon || "chevron_right"}}</v-icon>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: "Breadcrumbs",
  props: ["items", "dividerIcon"]
}
</script>