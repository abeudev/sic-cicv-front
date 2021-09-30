<template>
  <v-container grid-list-md fluid fill-height class="login-page">
    <v-layout align-center row wrap justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-card-text>
            <v-layout row mt-2 mb-2>
              <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                  :size="50"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
                <br>
                <br>
                Please wait...
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
import { activateUser } from "../../api/sessions/sessions";

export default {
  /**
   * Create a loading animation then call activate user api.
   */
  mounted() {
    this.onActivateUser();
  },
  methods: {
    async onActivateUser() {
      try {
        await activateUser(this.$route.params.token);
        this.$snotify.success(`Your account is active now, please login`, "Success");
        setTimeout(() => {
          this.$router.push({ name: "login" });
        }, 1000);
      } catch (error) {
        this.notifyErrors(error);
        setTimeout(() => {
          this.$router.push({ name: "login" });
        }, 1000);
      }
    }
  }
};
</script>