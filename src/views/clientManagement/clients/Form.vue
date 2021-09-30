<template>
  <v-container grid-list-lg v-loading="loading" pt-2 pl-0 pr-0>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-layout row wrap>
        <v-flex xs12>
          <div class="user-image-background mb-2 pt-3">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-avatar
                  class="cursor-pointer"
                  size="100"
                  color="grey lighten-3"
                  v-on="(!isReadonly || !isAdmin) && !editedItem.useImage ? on : null"
                  @click="
                    (!isReadonly || !isAdmin) && !editedItem.useImage ? getAvatar() : null
                  "
                >
                  <v-img
                    :src="profilePicture"
                    class="elevation-10"
                    v-if="editedItem.useImage"
                  />
                  <g-avatar
                    :value="editedItem.avatar"
                    className="elevation-10"
                    v-if="!editedItem.useImage"
                  />
                </v-avatar>
              </template>
              <span>Click to randomize</span>
            </v-tooltip>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm4 md4>
          <v-text-field
            v-model="editedItem.firstName"
            label="First Name"
            class="required"
            :rules="rules.firstName"
            required
            :readonly="isReadonly"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-text-field
            v-model="editedItem.lastName"
            label="Last Name"
            :readonly="isReadonly"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="editedItem.username"
                :rules="rules.username"
                label="Username"
                class="required"
                required
                :readonly="isReadonly || isAdmin"
                v-on="isReadonly || isAdmin ? on : null"
              ></v-text-field>
            </template>
            <span>Only Admin can edit</span>
          </v-tooltip>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="editedItem.email"
                :rules="rules.email"
                label="Email"
                type="email"
                class="required"
                required
                :readonly="isReadonly || isAdmin"
                v-on="isReadonly || isAdmin ? on : null"
              ></v-text-field>
            </template>
            <span>Only Admin can edit</span>
          </v-tooltip>
        </v-flex>
        <v-flex xs12 sm4 md4 v-if="!$route.params.id">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="editedItem.password"
                :rules="rules.password"
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                @click:append="isReadonly ? null : (showPassword = !showPassword)"
                required
                class="required"
                :readonly="isReadonly || isAdmin"
                v-on="isReadonly || isAdmin ? on : null"
              ></v-text-field>
            </template>
            <span>Only Admin can edit</span>
          </v-tooltip>
        </v-flex>
        <v-flex xs12 sm4 md4 v-else>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="editedItem.password"
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                :readonly="!changePassword || isReadonly || isAdmin"
                :append-outer-icon="changePassword ? 'lock_open' : 'lock'"
                @click:append-outer="
                  isReadonly ? null : (changePassword = !changePassword)
                "
                @click:append="isReadonly ? null : (showPassword = !showPassword)"
                v-on="isReadonly || isAdmin ? on : null"
              ></v-text-field>
            </template>
            <span>Only Admin can edit</span>
          </v-tooltip>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-radio-group
            v-model="editedItem.gender"
            row
            class="justify-center"
            :readonly="isReadonly"
          >
            <v-radio label="Male" value="male" color="blue"></v-radio>
            <v-radio label="Female" value="female" color="blue"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <DatePicker
            label="Date of Birth"
            :date.sync="editedItem.dateOfBirth"
            :rules="rules.dateOfBirth"
            required
            className="required"
            :readonly="isReadonly"
          ></DatePicker>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-text-field
            v-model="editedItem.phone"
            label="Phone"
            required
            :readonly="isReadonly"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <Address :value.sync="editedItem.address" :readonly="isReadonly"></Address>
    </v-form>
    <v-layout align-end justify-center pt-4>
      <v-btn class="secondary-color" flat round :disabled="loading" to="/clients/table"
        >Cancel</v-btn
      >
      <v-btn
        class="primary-color-2"
        round
        :loading="loading"
        :disabled="!valid"
        @click.native="save"
        v-if="!isReadonly"
        >Save</v-btn
      >
    </v-layout>
  </v-container>
</template>

<script>
import { newUser, updateUser, getUser } from "../../../api/userManagement/users";
import { getRandomAvatar } from "../../../components/helpers/jsUtills/getAvatar";
import DatePicker from "../../../components/helpers/DatePicker";
import Address from "../../../components/helpers/Address";
export default {
  components: { DatePicker, Address },
  data() {
    return {
      editedItem: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        isClient: true,
        phone: "",
        gender: "male",
        address: {
          country: "",
          state: "",
          city: "",
          streetName: "",
        },
        image: "",
        avatar: "",
      },

      // Form Rules
      valid: false,
      loading: false,
      loadingBtn: false,
      showPassword: false,
      changePassword: false,
      rules: {
        firstName: [(v) => !!v || "First name is required"],
        username: [
          (v) => !!v || "Username is required",
          (v) => v.length >= 4 || "Username must have at least 4 letters.",
          (v) =>
            /^([a-zA-Z0-9._])+$/.test(v) ||
            "Character not allowed. Allowed: (a-z), (A-Z), (0-9), (.), (_)",
        ],
        email: [
          (v) => !!v || "Email is required",
          (v) => this.isEmailValid(v) || "Email is not valid",
        ],
        password: [
          (v) => !!v || "Password is required",
          (v) => (!!v && v.length >= 5) || "Password must have at least 4 letters",
        ],
        dateOfBirth: [(v) => !!v || "Date of Birth is required"],
      },
      // =================
    };
  },
  computed: {
    /**
     * Get the image format wether avatar or png image.
     * If use image then add a param version to get the latest image state,
     * else is avatar string
     */
    profilePicture() {
      return !this.editedItem.useImage
        ? this.editedItem.avatar
        : this.editedItem.image
        ? `${this.editedItem.image}?v=${this.$moment().format("x")}`
        : "";
    },
    /**
     * Check wether user has access write or admin
     */
    isReadonly() {
      return !this.hasAccess(["write", "admin"]);
    },
    /**
     * Check wether user has access admin
     */
    isAdmin() {
      return !this.hasAccess(["admin"]);
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    /**
     * Load selected user data
     */
    async initData() {
      try {
        this.loading = true;

        if (this.$route.params.id) {
          const user = await getUser(this.$route.params.id);
          this.editedItem = { ...user.data.data };
        } else {
          this.editedItem.avatar = getRandomAvatar();
        }
      } catch (error) {
        this.notifyErrors(error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Save user data
     */
    async save() {
      this.loading = true;
      let data = JSON.parse(JSON.stringify(this.editedItem));
      try {
        if (this.$refs.form.validate()) {
          if (this.$route.params.id) {
            data._id = this.$route.params.id;
            if (!data.password) delete data.password;
            await updateUser(data);
          } else {
            await newUser(data);
          }
          this.$snotify.success("Data saved!", "Success");
          return this.$router.push({ name: "clientTable" });
        }
      } catch (error) {
        this.notifyErrors(error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Randomize avatar
     */
    getAvatar() {
      this.editedItem.avatar = getRandomAvatar();
    },

    /**
     * Validate Email
     * @param {String} email
     * @returns {Boolean}
     */
    isEmailValid(email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
  },
};
</script>
