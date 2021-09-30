<template>
  <div class="page-layout">
    <g-breadcrumbs :items="breadcrumbs" />
    <v-container grid-list-lg pl-0 pr-0 pt-0>
      <v-layout row wrap v-loading="loading">
        <v-flex xs12 sm3 md3 text-xs-center>
          <user-card :mainData.sync="mainData" />
        </v-flex>
        <v-flex xs12 sm9 md9>
          <user-form :mainData.sync="mainData" :loading.sync="loading" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Card from "./profile/Card";
import Form from "./profile/Form";
export default {
  components: { 
    userCard: Card,
    userForm: Form
  },
  data() {
    return {
      // Breadcrumbs
      breadcrumbs: [
        {
          text: "Dashboard",
          disabled: false,
          href: "/"
        },
        {
          text: "Profile",
          disabled: true,
          href: "#"
        }
      ],
      // Main
      mainData: {},
      loading: false
    };
  }
};
</script>
