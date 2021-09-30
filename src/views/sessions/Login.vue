<template>
  <v-container grid-list-md fluid fill-height class="login-page">
    <v-layout align-center row wrap justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-card-text>
            <v-layout row mt-4 mb-4>
              <v-flex xs12>
                <h2 class="text-xs-center primary-color">Welcome to CICV!</h2>
              </v-flex>
            </v-layout>

            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="onLogin()"
              id="loginForm"
            >
              <v-text-field
                class="pl-4 pr-4"
                prepend-icon="person"
                name="username"
                label="Username"
                color="orange"
                v-model="credentials.username"
                :rules="rules.username"
                required
              ></v-text-field>
              <v-text-field
                color="orange"
                class="pl-4 pr-4"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                v-model="credentials.password"
                :rules="rules.password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-layout row wrap class="mb-4" align-center>
              <v-flex xs12>
                <div class="text-xs-center mb-3">
                  <v-btn
                    class="secondary-color"
                    :loading="loading"
                    :disabled="!valid"
                    round
                    type="submit"
                    form="loginForm"
                    >Login</v-btn
                  >
                </div>
              </v-flex>
              <v-flex xs6>
                <div class="text-xs-left pl-4">
                  <router-link to="forgot-password" class="primary-color-1"
                    >Forgot Password</router-link
                  >
                </div>
              </v-flex>
              <v-flex xs6>
                <div class="text-xs-right pr-4">
                  <router-link to="register" class="primary-color-2"
                    >Register</router-link
                  >
                </div>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
import store from "@/store";
import { mapActions } from "vuex";
import { login } from "../../api/sessions/sessions";
import { getMyProfile } from "../../api/userManagement/users";
import { getCurrentUserRole } from "../../api/userManagement/roles";
import { getSettings } from "../../api/utilities/settings";

export default {
  data: () => ({
    credentials: {
      username: "",
      password: "",
    },
    rules: {
      username: [
        (v) => !!v || "Username is required",
        (v) => v.length >= 4 || "Username must have at least 4 letters.",
        (v) =>
          /^([a-zA-Z0-9._])+$/.test(v) ||
          "Character not allowed. Allowed: (a-z), (A-Z), (0-9), (.), (_)",
      ],
      password: [(v) => !!v || "Password is required"],
    },
    valid: false,
    loading: false,
    // ========== Only for Demo Start ==========
    loginTypes: ["admin", "user", "guest"],
    // ========== Only for Demo End ==========
  }),
  /**
   * Remove all kind of Authorization and Store Content
   */
  beforeCreate() {
    const namespaces = ["auth", "config", "user"];
    namespaces.forEach((namespace) => {
      store.dispatch(`${namespace}/resetState`);
    });
    window.localStorage.clear();
  },
  methods: {
    /**
     * Import actions from Vuex Store
     */
    ...mapActions({
      setAuth: "auth/setAuth",
      setRole: "auth/setRole",
      setProfile: "user/setProfile",
      setConfig: "config/setConfig",
    }),
    /**
     * Login to get token,
     * then get Profile Data, Role Data, and Site Config Data,
     * finally set those results to Vuex Store
     */
    async onLogin() {
      try {
        if (this.$refs.form.validate()) {
          this.loading = true;
          const auth = await login(this.credentials);
          const authData = {
            token: auth.data.data.token,
          };
          this.setAuth(authData);
          const promises = [getMyProfile(), getCurrentUserRole(), getSettings()];
          const results = await Promise.all(promises);
          this.setProfile(results[0].data.data);
          this.setRole(results[1].data.data);
          this.setConfig(results[2].data.data);
          authData.expires =
            results[2].data.data.session.value + results[2].data.data.session.unit;
          this.setAuth(authData);
          this.$router.push({ name: "dashboard" });
        }
      } catch (error) {
        this.notifyErrors(error);
      } finally {
        this.loading = false;
      }
    },
    /**
     * Only for Demo in http://www.genno.site/ - username/password
     * Admin: admin/admin123
     * User: user/user123
     * Guest: guest/guest123
     * @param {String} type
     */
    loginAs(type) {
      this.credentials = {
        username: `${type}`,
        password: `${type}123`,
      };
    },
  },
};
</script>
