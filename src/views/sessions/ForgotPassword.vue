<template>
  <v-container grid-list-md fluid fill-height class="login-page">
    <v-layout align-center row wrap justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-card-text>
            <v-layout row mt-4 mb-4>
              <v-flex xs12>
                <h2 class="text-xs-center primary-color">Forgot Password</h2>
              </v-flex>
            </v-layout>

            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="onForgotPassword()"
              id="forgotPasswordForm"
            >
              <v-text-field
                class="pl-4 pr-4"
                prepend-icon="email"
                v-model="email"
                :rules="rules.email"
                label="Email"
                type="email"
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
                    form="forgotPasswordForm"
                  >Reset my Password</v-btn>
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
import { forgotPassword } from "../../api/sessions/sessions";

export default {
  data() {
    return {
      email: null,
      rules: {
        email: [
          v => !!v || "Email is required",
          v => this.isEmailValid(v) || "Email is not valid"
        ]
      },
      valid: false,
      loadingBtn: false
    }
  },
  methods: {
    /**
     * Submit email then redirect to login page,
     * and let the backend to send reset password instructions
     */
    async onForgotPassword() {
      try {
        if (this.$refs.form.validate()) {
          this.loadingBtn = true;
          await forgotPassword({email: this.email});
          this.$snotify.success(`Please check your email then reset your password`, "Success");
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