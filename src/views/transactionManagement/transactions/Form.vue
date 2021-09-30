<template>
  <v-container grid-list-lg v-loading="loading" pt-2 pl-0 pr-0>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-layout row wrap>
        <v-flex xs12 sm4 md4>
          <DatePicker
            label="Date de depart"
            :date.sync="editedItem.departure_date"
            :rules="rules.departure_date"
            required
            className="required"
            :readonly="isReadonly"
          ></DatePicker>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <DatePicker
            label="Date d'arrivée"
            :date.sync="editedItem.arrival_date"
            :rules="rules.arrival_date"
            required
            className="required"
            :readonly="isReadonly"
          ></DatePicker>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-radio-group
            v-model="editedItem.isActive"
            row
            class="justify-center"
            :readonly="isReadonly"
          >
            <v-radio label="Activer" value="true" color="blue"></v-radio>
            <v-radio label="Desactiver" value="false" color="blue"></v-radio>
          </v-radio-group>
        </v-flex>
      </v-layout>

      <b><div>depart Info</div></b
      ><Address
        :value.sync="editedItem.departure_place"
        :readonly="isReadonly"
        label="lieu de depart"
        class="required"
        :rules="rules.departure_place"
        required
      ></Address>
      <b><div>Arrivée Info</div></b>
      <Address
        :value.sync="editedItem.arrival_place"
        :readonly="isReadonly"
        label="lieu d'arrivée"
        class="required"
        :rules="rules.arrival_place"
        required
      ></Address>
    </v-form>
    <v-layout align-end justify-center pt-4>
      <v-btn
        class="secondary-color"
        flat
        round
        :disabled="loading"
        to="/transaction/table"
        >Annuler</v-btn
      >
      <v-btn
        class="primary-color-2"
        round
        :loading="loading"
        :disabled="!valid"
        @click.native="save"
        v-if="!isReadonly"
        >Enregistrer</v-btn
      >
    </v-layout>
  </v-container>
</template>

<script>
import {
  createOne,
  updateOne,
  getOne,
} from "../../../api/transactionManagement/transactions";
import DatePicker from "../../../components/helpers/DatePicker";
import Address from "../../../components/helpers/Address";

export default {
  components: { DatePicker, Address },
  data() {
    return {
      editedItem: {
        departure_place: null,
        arrival_place: null,
        departure_date: null,
        arrival_date: null,
        isActive: true,
      },
      // Form Rules
      valid: false,
      loading: false,
      rules: {
        departure_place: [(v) => !!v || "departure_place is required"],
        arrival_place: [(v) => !!v || "arrival_place is required"],
        departure_date: [(v) => !!v || "departure_date is required"],
        arrival_date: [(v) => !!v || "arrival_date is required"],
      },
      // =================
    };
  },
  computed: {
    /**
     * Check wether boarding_type has access write or admin
     */
    isReadonly() {
      return !this.hasAccess(["write", "admin"]);
    },
    /**
     * Check wether boarding_type has access admin
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
     * Load selected  data
     */
    async initData() {
      try {
        this.loading = true;
        if (this.$route.params.id) {
          const responseData = await getOne(this.$route.params.id);
          this.editedItem = { ...responseData.data.data };
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
     * Save  data
     */
    async save() {
      this.loading = true;
      let data = JSON.parse(JSON.stringify(this.editedItem));
      try {
        if (this.$refs.form.validate()) {
          if (this.$route.params.id) {
            data._id = this.$route.params.id;
            if (!data.password) delete data.password;
            await updateOne(data);
          } else {
            await createOne(data);
          }
          this.$snotify.success("Data saved!", "Success");
          return this.$router.push({ name: "transactionsTable" });
        }
      } catch (error) {
        this.notifyErrors(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
