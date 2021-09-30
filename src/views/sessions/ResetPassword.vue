<template>
  <v-container grid-list-md fluid fill-height class="login-page">
    <v-layout align-center row wrap justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-card-text>
            <v-layout row mt-4 mb-4>
              <v-flex xs12>
                <h2 class="text-xs-center primary-color">Reset Password</h2>
              </v-flex>
            </v-layout>

            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="onResetPassword()"
              id="resetPasswordForm"
            >
              <v-text-field
                class="pl-4 pr-4"
                prepend-icon="lock"
                label="New Password"
                type="password"
                v-model="resetPasswordData.newPassword"
                :rules="rules.password"
                required
              ></v-text-field>
              <v-text-field
                class="pl-4 pr-4"
                prepend-icon="lock"
                label="Confirmation Password"
                type="password"
                v-model="resetPasswordData.confirmPassword"
                :rules="rules.confirmPassword"
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
                    form="resetPasswordForm"
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
import { resetPassword } from "../../api/sessions/sessions";

export default {
  data() {
    return {
      resetPasswordData: {
        newPassword: "",
        confirmPassword: ""
      },
      rules: {
        password: [v => !!v || "Password is required"],
        confirmPassword: [
          v => !!v || 'Confirmation Password is required',
          v => (this.resetPasswordData.newPassword === v) || 'Password must match'
        ]
      },
      valid: false,
      loadingBtn: false
    }
  },
  methods: {
    /**
     * Collect data and submit.
     */
    async onResetPassword() {
      try {
        if (this.$refs.form.validate()) {
          this.loadingBtn = true;
          await resetPassword({
            password: this.resetPasswordData.newPassword
          }, this.$route.params.token);
          this.$snotify.success(`Success update your password, please login`, "Success");
          this.$router.push({ name: "login" });
        }
      } catch (error) {
        this.notifyErrors(error);
      } finally {
        this.loadingBtn = false;
      }
    }
  }
};
</script>