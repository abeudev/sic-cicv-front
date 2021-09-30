<template>
  <v-container grid-list-lg fluid>
    <v-layout align-center row wrap justify-center class="card-home-container mb-5">
      <v-flex xs12 class="text-xs-center">
        <h1>Welcome {{user.firstName}} {{user.lastName}}.</h1>
        <br>
      </v-flex>
      <v-flex xs12 sm4>
        <v-card class="mx-auto elevation-home-user-card" color="secondary lighten-1" dark max-width="400">
          <v-card-text class="headline font-weight-bold text-xs-center">
            <v-icon large color="grey lighten-3" class="py-2">
              mdi-account-group-outline
            </v-icon>
            <h4 class="my-2">User Management</h4>
            <v-btn depressed round color="white" class="my-3 text-capitalize secondary--text" :to="{name: 'usersTable'}">View</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm1 />
      <v-flex xs12 sm4>
        <v-card class="mx-auto elevation-soft-grey" max-width="400">
          <v-card-text class="headline font-weight-bold text-xs-center">
            <v-icon large color="amber" class="py-2">
              mdi-account-lock-outline
            </v-icon>
            <h4 class="my-2 grey--text darken-2">Roles &amp; Permissions</h4>
            <v-btn depressed round color="amber" class="my-3 text-capitalize white--text" :to="{name: 'rolesTable'}">View</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout align-center row wrap justify-center class="card-home-container">
      <v-flex xs12 sm3>
        <v-card class="mx-auto elevation-soft-grey" max-width="400">
          <v-card-text class="headline font-weight-bold text-xs-center">
            <v-icon large color="teal accent-3" class="py-2">
              mdi-text-box-outline
            </v-icon>
            <h5 class="my-2 grey--text darken-2">Docs</h5>
            <v-btn depressed small round color="teal accent-3" class="my-3 text-capitalize white--text" :to="{name: 'docsQuickStart'}">View</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm1 />
        <v-flex xs12 sm3>
        <v-card class="mx-auto elevation-soft-grey" max-width="400">
          <v-card-text class="headline font-weight-bold text-xs-center">
            <v-icon large color="deep-purple accent-2" class="py-2">
              mdi-post-outline
            </v-icon>
            <h5 class="my-2 grey--text darken-2">Gestion des Entrepôts</h5>
            <v-btn depressed small round color="deep-purple accent-2" class="my-3 text-capitalize white--text" :to="{name: 'warehousesTable'}">View</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm1 />
      <v-flex xs12 sm3>
        <v-card class="mx-auto elevation-soft-grey" max-width="400">
          <v-card-text class="headline font-weight-bold text-xs-center">
            <v-icon large color="deep-purple accent-2" class="py-2">
              mdi-post-outline
            </v-icon>
            <h5 class="my-2 grey--text darken-2">Sample Page</h5>
            <v-btn depressed small round color="deep-purple accent-2" class="my-3 text-capitalize white--text" :to="{name: 'feedsTable'}">View</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm1 />
      <v-flex xs12 sm3>
        <v-card class="mx-auto elevation-soft-grey" max-width="400">
          <v-card-text class="headline font-weight-bold text-xs-center">
            <v-icon large color="blue accent-2" class="py-2">
              mdi-table
            </v-icon>
            <h5 class="my-2 grey--text darken-2">Datatable</h5>
            <v-btn depressed small round color="blue accent-2" class="my-3 text-capitalize white--text" :to="{name: 'docsDataTable'}">View</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: mapGetters({
    user: "user/profile"
  })
}
</script>