<template>
  <div>
    <v-container grid-list-md v-loading="loading" pl-0 pr-0>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-layout row wrap>
          <v-flex xs12 class="pb-0">
            <h3>General</h3>
          </v-flex>
          <v-flex xs12 sm4>
            <v-text-field
              v-model="editedItem.name"
              :rules="rules.name"
              label="Name"
              class="required"
              required
              :readonly="isReadonly"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 class="pb-0">
            <h3>Select Menu</h3>
          </v-flex>
        </v-layout>
        <roles-tree :tree="routes" :value.sync="editedItem.permissions" placeholder="Select Menus" />
      </v-form>
      <v-layout align-end justify-center pt-4>
        <v-btn color="primary darken-1" flat round :disabled="loading" to="/roles/table">Cancel</v-btn>
        <v-btn color="primary" round :loading="loading" :disabled="!valid" @click.native="save" v-if="!isReadonly">Save</v-btn>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { newRole, updateRole, getRole } from "../../../api/userManagement/roles";
import RolesTree from "./RolesTree";
export default {
  components: { RolesTree },
  data() {
    return {
      editedItem: {
        name: "",
        permissions: []
      },

      // Form Rules
      valid: false,
      loading: false,
      rules: {
        name: [
          v => !!v || "Name is required",
          v => v.length >= 4 || "Name must have at least 4 letters.",
          v => /^([a-zA-Z0-9._])+$/.test(v) || "Character not allowed. Allowed: (a-z), (A-Z), (0-9), (.), (_)"
        ],
        permissions: [v => !!v || "Permission is required"]
      },
      // =================
    };
  },
  mounted() {
    this.initData();
  },
  computed: {
    /**
     * Import routes options from store
     */
    ...mapGetters({routes: "template/routes"}),
    isReadonly() {
      return !this.hasAccess(['write', 'admin']);
    }
  },
  methods: {
    /**
     * Load data from server on edit mode
     */
    async initData() {
      try {
        this.loading = true;
        if (this.$route.params.id) {
          const roles = await getRole(this.$route.params.id);
          const data = roles.data.data;
          this.editedItem = data;
        }
      } catch (error) {
        this.notifyErrors(error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Collect and save data
     */
    async save() {
      this.loading = true;
      let data = JSON.parse(JSON.stringify(this.editedItem));

      try {
        if (this.$refs.form.validate()) {
          data.permissions = this.insertRequiredPermissions(data.permissions);
          if (this.$route.params.id) {
            data._id = this.$route.params.id;
            if (!data.password) delete data.password;
            await updateRole(data);
          } else {
            await newRole(data);
          }
          this.$snotify.success("Data saved!", "Success");
          return this.$router.push({ name: "rolesTable" });
        }
      } catch (error) {
        this.notifyErrors(error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Insert Required Permissions
     */
    insertRequiredPermissions(permissions) {
      const required = ['dashboard', 'userProfile'];
      required.reverse().forEach(item => {
        const isPresent = permissions.some(permission => permission.name == item);
        if (!isPresent) {
          const route = this.routes.find(route => route.name == item);
          permissions.unshift(JSON.parse(JSON.stringify(route)));
        }
      });
      return permissions;
    }
  }
};
</script>