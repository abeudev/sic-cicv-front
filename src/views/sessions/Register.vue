<template>
  <v-container grid-list-md fluid fill-height class="login-page">
    <v-layout align-center row wrap justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-card-text>
            <v-layout row mt-4 mb-4>
              <v-flex xs12>
                <h2 class="text-xs-center primary-color">Register</h2>
              </v-flex>
            </v-layout>

            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="onRegister()"
              id="registerForm"
            >
              <v-text-field
                class="pl-4 pr-4"
                prepend-icon="contacts"
                v-model="registerData.firstName"
                :rules="rules.firstName"
                label="First Name"
                required
              ></v-text-field>
              <v-text-field
                class="pl-4 pr-4"
                prepend-icon="email"
                v-model="registerData.email"
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
                v-model="registerData.username"
                :rules="rules.username"
                required
                autofocus
              ></v-text-field>
              <v-text-field
                class="pl-4 pr-4"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                v-model="registerData.password"
                :rules="rules.password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-layout row wrap class="mb-4" align-center>
              <v-flex xs12>
                <div class="text-xs-center">
                  <v-btn
                    :loading="loadingBtn"
                    :disabled="!valid"
                    round
                    color="primary"
                    type="submit"
                    form="registerForm"
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
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
import { getRandomAvatar } from "../../components/helpers/jsUtills/getAvatar";
import { registerUser } from "../../api/sessions/sessions";

export default {
  data() {
    return {
      registerData: {
        firstName: "",
        email: "",
        username: "",
        password: "",
        avatar: getRandomAvatar()
      },
      rules: {
        firstName: [v => !!v || "First name is required"],
        username: [
          v => !!v || "Username is required",
          v => v.length >= 4 || "Username must have at least 4 letters.",
          v => /^([a-zA-Z0-9._])+$/.test(v) || "Character not allowed. Allowed: (a-z), (A-Z), (0-9), (.), (_)"
        ],
        email: [
          v => !!v || "Email is required",
          v => this.isEmailValid(v) || "Email is not valid"
        ],
        password: [v => !!v || "Password is required"]
      },
      valid: false,
      loadingBtn: false
    }
  },
  methods: {
    /**
     * Collect data and submit.
     * getRandomAvatar() is used to generate avatar from helper.
     */
    async onRegister() {
      try {
        if (this.$refs.form.validate()) {
          this.loadingBtn = true;
          await registerUser(this.registerData);
          this.$snotify.success(`Please check your email then activate your account`, "Success");
          this.$router.push({ name: "login" });
        }
      } catch (error) {
        this.notifyErrors(error);
      } finally {
        this.loadingBtn = false;
      }
    },
    /**
     * Validate Email
     * @param {String} email
     * @returns {Boolean}
     */
    isEmailValid(email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
};
</script>