<template>
  <div>
    <navbar />
    <v-content class="mb-5">
      <v-container fluid pt-0>
        <transition name="fade" mode="out-in" :duration="{ enter: 100, leave: 50 }">
          <slot />
        </transition>
      </v-container>
    </v-content>
    <v-footer
      absolute
      color="transparent"
      height="auto"
      class="justify-center pa-3"
      style="z-index: 0"
    >
      Copyright &copy;2021 CICV {{ version }} — made by &nbsp;<a
        href="http://smartinnovationscenter.com/"
        target="_blank"
        >Smart Innovations Center
      </a>
    </v-footer>
    <v-dialog v-model="isExpired" max-width="500px" persistent scrollable>
      <v-card>
        <v-card-title>
          <span class="headline">Session Expired</span>
        </v-card-title>
        <v-card-text class="py-0">
          <v-layout row wrap>
            <v-flex xs12>
              Your session is Expired. Please backup your changes and relogin.
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="pa-3">
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" flat round @click.native="toggleModal()"
            >Close</v-btn
          >
          <v-btn color="primary" round :to="{ name: 'logout' }">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { getCurrentUserRole } from "../api/userManagement/roles";
import Navbar from "./parts/NavigationDrawer";

export default {
  components: {
    Navbar,
  },
  computed: {
    ...mapGetters({ isExpired: "auth/isExpired" }),
    version() {
      return process.env.VUE_APP_VERSION;
    },
  },
  mounted() {
    getCurrentUserRole()
      .then((response) => {
        this.setRole(response.data.data);
      })
      .catch((error) => {
        this.notifyErrors(error);
      });
  },
  methods: {
    ...mapActions({
      setTokenExpired: "auth/setTokenExpired",
      setRole: "auth/setRole",
    }),
    toggleModal() {
      this.setTokenExpired(!this.isExpired);
    },
  },
};
</script>
