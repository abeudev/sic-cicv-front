<template>
  <v-container grid-list-lg v-loading="loading" pt-2 pl-0 pr-0>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-layout row wrap>
        <v-flex xs12 sm4 md4>
          <v-text-field
            v-model="editedItem.name"
            :rules="rules.name"
            class="required"
            label="Name"
            required
            :readonly="isReadonly"
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm4 md4>
          <v-autocomplete
            :items="users"
            v-model="editedItem.departure_customer_ID"
            :rules="rules.departure_customer_ID"
            label="departure_customer"
            class="required"
            required
            :readonly="isReadonly"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-autocomplete
            :items="users"
            v-model="editedItem.arrival_customer_ID"
            :rules="rules.arrival_customer_ID"
            label="arrival_customer"
            class="required"
            required
            :readonly="isReadonly"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-autocomplete
            :items="transactions"
            v-model="editedItem.transaction_ID"
            :rules="rules.transaction_ID"
            label="transaction"
            class="required"
            required
            :readonly="isReadonly"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-autocomplete
            :items="transaction_status"
            v-model="editedItem.transaction_status"
            :rules="rules.transaction_status"
            label="transaction_status"
            class="required"
            required
            :readonly="isReadonly"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-autocomplete
            :items="payment_status"
            v-model="editedItem.payment_status"
            :rules="rules.payment_status"
            label="payment_status"
            class="required"
            required
            :readonly="isReadonly"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-text-field
            v-model="editedItem.track_number"
            label="track_number"
            :disabled="true"
            :readonly="isReadonly"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-checkbox
            v-model="editedItem.isActive"
            :label="`activer: ${editedItem.isActive.toString()}`"
          ></v-checkbox>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-text-field
            v-model="editedItem.withdrawal_code"
            label="withdrawal_code"
            :disabled="true"
            :readonly="isReadonly"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-checkbox
            v-model="editedItem.delivery"
            :label="`delivery: ${editedItem.delivery.toString()}`"
          ></v-checkbox>
        </v-flex>
        <v-flex xs12 sm4 md4 v-show="editedItem.delivery">
          <DatePicker
            label="delivery_date"
            :date.sync="editedItem.delivery_date"
            :rules="rules.delivery_date"
            :readonly="isReadonly"
            className="required"
            required
          ></DatePicker>
        </v-flex>
        <v-flex xs12 sm4 md4 v-show="editedItem.delivery">
          <TimePicker
            label="Start Time"
            :time.sync="editedItem.delivery_startTime"
            :rules="rules.timeValid"
            :max="editedItem.endTime"
            className="required"
            required
          />
          <TimePicker
            label="End Time"
            :time.sync="editedItem.delivery_endTime"
            :rules="rules.timeValid"
            :min="editedItem.delivery_startTime"
            className="required"
            required
          />
        </v-flex>

        <v-flex xs12 sm4 md4 v-show="editedItem.delivery">
          <location-picker :location.sync="editedItem.delivery_place" />
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-textarea
            label="Description"
            v-model="editedItem.description"
            :readonly="isReadonly"
          ></v-textarea>
        </v-flex>
      </v-layout>
    </v-form>
    <v-layout align-end justify-center pt-4>
      <v-btn color="primary darken-1" flat round :disabled="loading" to="/colis/table"
        >Cancel</v-btn
      >
      <v-btn
        color="primary"
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
import { createOne, updateOne, getOne } from "../../../api/colisManagement/colis";

import { getUserOptions } from "../../../api/userManagement/users";
import { getTransactionOptions } from "../../../api/transactionManagement/transactions";

import DatePicker from "../../../components/helpers/DatePicker";
import Address from "../../../components/helpers/Address";
import TimePicker from "../../../components/helpers/TimePicker";
import LocationPicker from "../../../components/helpers/LocationPicker";

export default {
  components: { DatePicker, Address, TimePicker, LocationPicker },
  data() {
    return {
      users: [],
      transactions: [],
      transaction_status: [
        "Reception de la commande",
        "Colis reçu par l'agent  en entrepôt",
        "Colis reçu en entrepôt",
        "En cours d'emballage",
        "Emballé",
        "Embarqué",
        "Arrivé à destination et stocké dans nos locaux",
        "Prêt à la distriibution",
        "livré",
        "annulé",
      ],
      payment_status: ["non payé", "payé à moitié", "payé"],
      editedItem: {
        name: null,
        description: null,
        departure_customer_ID: null,
        arrival_customer_ID: null,
        transaction_ID: null, //ajouter un champ de liason à transaction permettant d'avoir les date et lieu de depart et d'arrivé( cle etrangere)
        transaction_status: null, // à transformer en int ou bool pour les etape reçu, embarqué, ...
        track_number: "", // generer par UUID
        withdrawal_code: "", // generer par UUID
        payment_status: null, //creer une autre table. Type de paiement à ajouter (cash, mobile money, autre)
        delivery: false, // active les champs suivants qui sont facultatifs: lieu de livraison, date et heure de livraison
        delivery_place: null, // à mapper avec google MAPS
        delivery_date: null,
        isActive: true,
        /*** supplementaire */
        delivery_startTime: "00:00",
        delivery_endTime: "00:00",
      },
      // Form Rules
      valid: false,
      loading: false,
      rules: {
        name: [(v) => !!v || "name is required"],
        description: [(v) => !!v || "description is required"],
        departure_customer: [(v) => !!v || "departure_customer is required"],
        arrival_customer: [(v) => !!v || "arrival_customer is required"],
        transaction_status: [(v) => !!v || "transaction_status is required"],
        track_number: [(v) => !!v || "track_number is required"],
        withdrawal_code: [(v) => !!v || "withdrawal_code is required"],
        payment_status: [(v) => !!v || "payment_status is required"],
        delivery: [(v) => !!v || "payment_status is required"],
        delivery_place: [(v) => !!v || "delivery is required"],
        transaction_ID: [(v) => !!v || "transaction is required"],
        transaction_status: [(v) => !!v || "transaction_status is required"],

        delivery_date: [(v) => !!v || "delivery_date is required if delivery is enable"],
        timeValid: [
          (v) => !!v || "delivery delivery_startTime and delivery_endTime is required",
        ],
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
     * Load selected boarding_type data
     */
    async initData() {
      try {
        this.loading = true;

        await getUserOptions().then((response) => {
          this.users = response.data.data;
        });
        await getTransactionOptions().then((response) => {
          this.transactions = response.data.data;
        });

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
     * Save boarding_type data
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
          return this.$router.push({ name: "colisTable" });
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
