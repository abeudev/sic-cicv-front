<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container grid-list-lg pl-0 pr-0 pt-0>
      <v-layout row wrap>
        <v-flex xs12 class="pb-0">
          <h3>General Settings</h3>
        </v-flex>
        <v-flex xs12 sm4>
          <v-text-field
            v-model="editedItem.general.siteTitle"
            :rules="rules.required"
            label="Site Title"
            :readonly="isReadonly"
            required
            class="required"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm8>
          <v-text-field 
            v-model="editedItem.general.description" 
            label="Descriptions"
            :readonly="isReadonly"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 class="pb-0">
          <h3>Time and Region</h3>
        </v-flex>
        <v-flex xs12 sm3>
          <v-autocomplete
            :items="dateFormatOptions"
            v-model="editedItem.timeAndRegion.dateFormat"
            label="Date Format"
            :readonly="isReadonly"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs12 sm3>
          <v-autocomplete
            :items="timeFormatOptions"
            v-model="editedItem.timeAndRegion.timeFormat"
            label="Time Format"
            :readonly="isReadonly"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs12 sm3>
          <v-autocomplete
            :items="timezoneOptions"
            v-model="editedItem.timeAndRegion.timezone"
            label="Time Zone"
            :readonly="isReadonly"
          ></v-autocomplete>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 class="pb-0">
          <h3>Default Session</h3>
        </v-flex>
        <v-flex xs12 sm4>
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <v-text-field 
                v-model="editedItem.session.value"
                label="Login Session"
                type="number"
                min="1"
                :rules="rules.required"
                required
                class="required"
                :readonly="isReadonly"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-autocomplete
                :items="sessionUnitOptions"
                v-model="editedItem.session.unit"
                label="Unit"
                :rules="rules.required"
                required
                class="required"
                :readonly="isReadonly"
              ></v-autocomplete>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm4>
          <v-autocomplete
            :items="roles"
            v-model="editedItem.session.defaultRoleID"
            :rules="rules.required"
            label="Default Role"
            required
            class="required"
            :readonly="isReadonly"
          ></v-autocomplete>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 class="pb-0">
          <h3>Contact Info</h3>
        </v-flex>
        <v-flex xs12 sm4>
          <v-text-field
            v-model="editedItem.contact.email"
            :rules="rules.emailValid"
            label="Email"
            type="email"
            required
            class="required"
            :readonly="isReadonly"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm4>
          <v-text-field
            v-model="editedItem.contact.phone"
            label="Phone"
            :rules="rules.required"
            required
            class="required"
            :readonly="isReadonly"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <Address :value.sync="editedItem.contact.address" :readonly="isReadonly"></Address>

      <v-layout align-end justify-center pt-4 v-if="!isReadonly">
        <v-btn color="primary" round :loading="loading" :disabled="!valid" @click.native="save">Save</v-btn>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
import { getSettings, updateSettings } from "../../../api/utilities/settings";
import { getRoleOptions } from "../../../api/userManagement/roles";
import Address from "../../../components/helpers/Address";

export default {
  props: ["mainData", "loading"],
  components: { Address },
  data() {
    return {
      roles: [],
      dateFormatOptions: [
        "DD/MM/YYYY",
        "MM/DD/YYYY",
        "DD-MM-YYYY",
        "MM-DD-YYYY"
      ],
      timeFormatOptions: [
        {
          text: "12 hours",
          value: "ampm"
        },
        {
          text: "24 hours",
          value: "24hr"
        }
      ],
      timezoneOptions: [],
      sessionUnitOptions: [
        {
          text: "Minutes",
          value: "min"
        }, 
        {
          text: "Hours",
          value: "h"
        },
        {
          text: "Days",
          value: "d"
        },
        {
          text: "Months",
          value: "m"
        },
        {
          text: "years",
          value: "y"
        }
      ],
      editedItem: {
        general: {
          siteTitle: null,
          description: null
        },
        timeAndRegion: {
          dateFormat: "DD/MM/YYYY",
          timeFormat: "H:mm",
          timezone: null
        },
        contact: {
          email: null,
          phone: null,
          address: {
            country : null,
            state : null,
            city : null,
            streetName : null
          }
        },
        session: {
          value: 24,
          unit: "hours",
          defaultRoleID: null
        }
      },

      // Form Rules
      valid: false,
      rules: {
        required: [v => !!v || "Site Title is required"],
        emailValid: [
          v => !!v || "Email is required",
          v => this.isEmailValid(v) || "Email is not valid"
        ]
      },
      // =================
    }
  },
  computed: {
    isReadonly() {
      return !this.hasAccess(['admin']);
    }
  },
  mounted() {
    /**
     * Load timezone data from moment-timezone
     */
    this.timezoneOptions = [...this.$moment.tz.names()];
    this.initData();
  },
  methods: {
    /**
     * Import action from store
     */
    ...mapActions({
      setConfig: "config/setConfig"
    }),
    /**
     * Load data from API
     */
    async initData() {
      try {
        this.$emit("update:loading", true);
        const promises = [getRoleOptions(), getSettings()];
        const values = await Promise.all(promises);
        this.roles = values[0].data.data;
        this.editedItem = values[1].data.data;
        if (!this.editedItem.contact.address) this.editedItem.contact.address = {};
        this.$emit("update:mainData", {...this.editedItem});
        return values[1].data.success;
      } catch (error) {
        this.notifyErrors(error);
      } finally {
        this.$emit("update:loading", false);
      }
    },

    /**
     * Collect and save data
     */
    async save() {
      this.$emit("update:loading", true);
      let data = JSON.parse(JSON.stringify(this.editedItem));
      try {
        if (this.$refs.form.validate()) {
          const settings = await updateSettings(data);
          this.$emit("update:mainData", {...settings.data.data});
          this.setConfig({...settings.data.data});
          this.$snotify.success("Data saved!", "Success");
        }
      } catch (error) {
        this.notifyErrors(error);
      } finally {
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
