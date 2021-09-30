<template>
  <v-dialog scrollable persistent :value="isModalOpen" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Update Users Role</span>
      </v-card-title>
      <v-card-text class="pt-0">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container grid-list-md v-loading="loading" pa-0>
            <v-layout row wrap v-for="(user, index) in usersData" :key="index">
              <v-flex xs12 sm7>
                <v-text-field
                  :value="`${user.firstName} ${user.lastName}`"
                  label="Name"
                  readonly
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm5>
                <v-autocomplete
                  :items="roles"
                  v-model="user.roleID"
                  :rules="required"
                  label="Select Role"
                  :loading="loadingOptions"
                  :disabled="loadingOptions"
                  required
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-3">
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" flat round @click.native="close" :disabled="loading">Close</v-btn>
        <v-btn color="primary" round :loading="loading" :disabled="!valid" @click.native="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/**
 * This modal is used to set permission of selected users
 */
import { getRoleOptions } from "../../../api/userManagement/roles";
import { updateUser } from "../../../api/userManagement/users";
export default {
  props: ["loading", "users", "isModalOpen"],
  data() {
    return {
      roles: [],
      usersData: [],
      valid: false,
      loadingOptions: false,
      required: [v => !!v || "This field is required"]
    };
  },
  watch: {
    /**
     * Observe and collect user data,
     * also load role options
     */
    users: function(val) {
      const users = JSON.parse(JSON.stringify(val));
      this.usersData = users.map(user => {
        user.roleID = user.role._id;
        return user;
      });
      if (this.users.length > 0) {
        this.loadingOptions = true;
        getRoleOptions().then(response => {
          this.roles = response.data.data;
          this.loadingOptions = false;
        })
        .catch(error => {
          this.notifyErrors(error);
          this.loadingOptions = false;
        });
      }
    }
  },
  methods: {
    /**
     * Save collected user roles data
     */
    async save() {
      let data = JSON.parse(JSON.stringify(this.usersData));
      try {
        if (this.$refs.form.validate()) {
          this.$emit("update:loading", true);
          const updateUsers = data.map(user => updateUser(user));
          await Promise.all(updateUsers);
          this.$snotify.success("Data saved!", "Success");
          this.$parent.$refs.usersTable.refreshTable();
          this.close();
        }
      } catch (error) {
        this.close();
        this.notifyErrors(error);
      }
    },
    /**
     * Close modal,
     * Reset passed users data
     */
    close() {
      this.$refs.form.resetValidation();
      this.$emit("update:users", []);
      this.$emit("update:isModalOpen", false);
      this.$emit("update:loading", false);
    }
  }
};
</script>