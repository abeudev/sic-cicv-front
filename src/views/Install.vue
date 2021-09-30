<template>
  <v-container grid-list-md fluid fill-height class="login-page">
    <v-layout align-center row wrap justify-center v-loading="loading">
      <v-flex xs12 sm8>
        <v-card class="elevation-12">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="onInstall()"
            id="installationForm"
          >
            <v-card-text>
              <v-layout row mt-4 mb-4>
                <v-flex xs12>
                  <h2 class="text-xs-center primary-color">Installation</h2>
                </v-flex>
              </v-layout>

              <v-layout row mt-4 mb-4>
                <v-flex xs12 sm6>
                  <v-text-field
                    class="pl-4 pr-4"
                    prepend-icon="contacts"
                    v-model="installData.user.firstName"
                    :rules="rules.required"
                    label="First Name"
                    required
                  ></v-text-field>
                  <v-text-field
                    class="pl-4 pr-4"
                    prepend-icon="email"
                    v-model="installData.user.email"
                    :rules="rules.email"
                    label="Email"
                    type="email"
                    required
                  ></v-text-field>
                  <v-text-field
                    class="pl-4 pr-4"
                    prepend-icon="person"
                    name="username"
                    label="Username"
                    v-model="installData.user.username"
                    :rules="rules.username"
                    required
                    autofocus
                  ></v-text-field>
                  <v-text-field
                    class="pl-4 pr-4"
                    prepend-icon="lock"
                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                    name="password"
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    v-model="installData.user.password"
                    :rules="rules.required"
                    required
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    class="pl-4 pr-4"
                    prepend-icon="public"
                    v-model="installData.siteSettings.general.siteTitle"
                    :rules="rules.required"
                    label="Site Title"
                    required
                  ></v-text-field>
                  <v-text-field
                    class="pl-4 pr-4"
                    prepend-icon="adb"
                    v-model="installData.role.name"
                    :rules="rules.required"
                    label="Super Admin Role Name"
                    required
                  ></v-text-field>
                  <v-autocomplete
                    prepend-icon="tonality"
                    :items="timezoneOptions"
                    v-model="installData.siteSettings.timeAndRegion.timezone"
                    :rules="rules.required"
                    class="pl-4 pr-4"
                    label="Time Zone"
                  ></v-autocomplete>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-layout row wrap class="mb-4" align-center>
                <v-flex xs12>
                  <div class="text-xs-center">
                    <v-btn
                      :loading="loading"
                      :disabled="!valid"
                      round
                      color="primary"
                      type="submit"
                      form="installationForm"
                    >Submit</v-btn>
                  </div>
                </v-flex>
                <v-flex xs12>
                  <div class="text-xs-center pt-3">
                    <router-link :to="{name: 'login'}">Back to login</router-link>
                  </div>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import { getRandomAvatar } from "../components/helpers/jsUtills/getAvatar";
import { checkSettings, installSettings } from "../api/utilities/settings";

export default {
  data() {
    return {
      timezoneOptions: [],
      installData: {
        user: {
          username: "",
          firstName: "",
          email: "",
          password: "",
          avatar: getRandomAvatar()
        },
        role: {
          name: "",
          defaultRoleName: "Default",
          permissions: []
        },
        siteSettings: {
          general: {
            siteTitle: ""
          },
          timeAndRegion: {
            timezone: "",
          }
        }
      },
      rules: {
        required: [v => !!v || "This field is required"],
        username: [
          v => !!v || "Username is required",
          v => v.length >= 4 || "Username must have at least 4 letters.",
          v => /^([a-zA-Z0-9._])+$/.test(v) || "Character not allowed. Allowed: (a-z), (A-Z), (0-9), (.), (_)"
        ],
        email: [
          v => !!v || "Email is required",
          v => this.isEmailValid(v) || "Email is not valid"
        ]
      },
      valid: false,
      loading: false,
      showPassword: false
    }
  },
  mounted() {
    this.timezoneOptions = [...this.$moment.tz.names()];
    this.checkInstallation();
  },
  computed: mapGetters({
    routes: "template/routes"
  }),
  methods: {
    /**
     * Collect data and submit.
     */
    async onInstall() {
      /**
       * Setting default routes for default role and permission creation.
       * Default routes here are 'dashboard' and 'userProfile'
       */
      const routes = JSON.parse(JSON.stringify(this.routes));
      const defaultRoutes = routes.filter(route => ['dashboard', 'userProfile'].includes(route.name));
      this.installData.role.permissions = defaultRoutes;
      // Clean up the object
      const data = JSON.parse(JSON.stringify(this.installData));
      try {
        if (this.$refs.form.validate()) {
          this.loading = true;
          await installSettings(data);
          this.$snotify.success(`Installation Success`, "Welcome");
          this.$router.push({ name: "login" });
        }
      } catch (error) {
        this.notifyErrors(error);
      } finally {
        this.loading = false;
      }
    },
    /**
     * Check wether the application has already installed with Super Admin User
     */
    checkInstallation() {
      checkSettings()
        .then(response => {
          const isInstalled = response.data.data.isInstalled
          if (isInstalled) {
            this.$snotify.error(`Application has been installed`, "Error");
            this.$router.push({ name: "login" });
          }
        })
        .catch(err => {
          this.notifyErrors(err);
          this.$router.push({ name: "login" });
        });
    },
    /**
     * Validate Email
     * @param {String} email
     * @returns {Boolean}
     */
    isEmailValid(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
};
</script>