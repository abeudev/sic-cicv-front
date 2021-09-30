<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-text-field
          v-model="editedItem.firstName"
          :rules="rules.firstName"
          label="First Name"
          required
          class="required"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field v-model="editedItem.lastName" label="Last Name"></v-text-field>
      </v-flex>
      <v-flex xs12 sm4>
        <v-text-field
          v-model="editedItem.username"
          :rules="rules.username"
          label="Username"
          required
          class="required"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4>
        <v-text-field
          v-model="editedItem.email"
          :rules="rules.email"
          label="Email"
          type="email"
          required
          class="required"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4>
        <v-text-field
          v-model="editedItem.password"
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          :readonly="!changePassword"
          :append-outer-icon="changePassword ? 'lock_open' : 'lock'"
          @click:append-outer="changePassword = !changePassword"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4>
        <DatePicker
          label="Date of Birth"
          :date.sync="editedItem.dateOfBirth"
          :rules="rules.dateOfBirth"
        ></DatePicker>
      </v-flex>
      <v-flex xs12 sm4>
        <v-text-field
          v-model="editedItem.phone"
          label="Phone"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4>
        <v-radio-group v-model="editedItem.gender" row class="justify-center">
          <v-radio label="Male" value="male" color="blue"></v-radio>
          <v-radio label="Female" value="female" color="blue"></v-radio>
        </v-radio-group>
      </v-flex>
    </v-layout>
    <Address :value.sync="editedItem.address" :required="false" :rules="rules.required" />
    <v-layout align-end justify-center pt-4>
      <v-btn color="primary" round :loading="loadingBtn" :disabled="!valid" @click.native="save">Save</v-btn>
    </v-layout>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
import { updateMyProfile, getMyProfile } from "../../../api/userManagement/users";
import { getRoleOptions } from "../../../api/userManagement/roles";
import DatePicker from "../../../components/helpers/DatePicker";
import Address from "../../../components/helpers/Address";

export default {
  props: ["mainData", "loading"],
  components: { DatePicker, Address },
  data() {
    return {
      user: this.$store.getters["user/profile"],
      roles: [],
      editedItem: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        role: "",
        phone: "",
        dateOfBirth: "",
        gender: "male",
        address : {
          country : "",
          state : "",
          city : "",
          streetName : ""
        },
        image: "",
      },

      // Form Rules
      valid: false,
      loadingBtn: false,
      showPassword: false,
      changePassword: false,
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
        password: [
          v => !!v || "Password is required",
          v => (!!v && v.length >= 5) || "Password must have at least 4 letters"
        ],
        role: [v => !!v || "Role is required"],
        dateOfBirth: [v => !!v || "Date of Birth is required"],
        required: [v => !!v || "This field is required"],
      },
      // =================
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    /**
     * Import action from Vuex Store
     */
    ...mapActions({
      setProfile: "user/setProfile"
    }),
    /**
     * Load User Profile Data
     */
    async initData() {
      try {
        this.loadingBtn = true;
        this.$emit("update:loading", true);
        await getRoleOptions().then(response => {
          this.roles = response.data.data;
        });
        const user = await getMyProfile();
        this.editedItem = user.data.data;
        this.$emit("update:mainData", {...this.editedItem});
        return user.data.success;
      } catch (error) {
        this.notifyErrors(error);
      } finally {
        this.loadingBtn = false;
        this.$emit("update:loading", false);
      }
    },

    /**
     * Save edited Data,
     * then save to Vuex Store
     */
    async save() {
      this.loadingBtn = true;
      this.$emit("update:loading", true);
      let data = JSON.parse(JSON.stringify(this.editedItem));
      try {
        if (this.$refs.form.validate()) {
          if (!data.password) delete data.password;
          const user = await updateMyProfile(data);
          this.$emit("update:mainData", {...user.data.data});
          this.setProfile(user.data.data);
          this.$snotify.success("Data saved!", "Success");
          return;
        }
      } catch (error) {
        this.notifyErrors(error);
      } finally {
        this.loadingBtn = false;
        this.$emit("update:loading", false);
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
}
</script>
