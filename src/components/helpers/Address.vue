<!-- Usage:
<Address :value.sync="address"></Address>
address: {
  country: null,
  state: null,
  city: null,
  streetName: null
}
-->

<template>
  <v-layout row wrap>
    <v-flex xs12 sm4>
      <v-autocomplete
        :items="countries"
        v-model="address.country"
        label="Pays"
        :readonly="readonly"
        :rules="required ? rules : []"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12 sm4>
      <v-autocomplete
        :items="states"
        v-model="address.state"
        label="Region"
        :loading="loadingStates"
        :readonly="readonly"
        :rules="required ? rules : []"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12 sm4>
      <v-autocomplete
        :items="cities"
        v-model="address.city"
        label="Ville"
        :loading="loadingCities"
        :readonly="readonly"
        :rules="required ? rules : []"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-textarea
        label="Commune/Quartier"
        v-model="address.streetName"
        :readonly="readonly"
        :rules="required ? rules : []"
      ></v-textarea>
    </v-flex>
  </v-layout>
</template>

<script>
import { getCountries, getStates, getCities } from "../../api/utilities/address";

export default {
  name: "Address",
  props: ["value", "readonly", "required", "rules"],
  data() {
    return {
      countries: [],
      states: [],
      cities: [],
      address: {
        country: null,
        state: null,
        city: null,
        streetName: null,
      },
      loadingStates: false,
      loadingCities: false,
    };
  },
  created() {
    this.initData();
  },
  watch: {
    value: {
      handler(val) {
        this.address = val;
      },
      deep: true,
    },
    address: {
      handler(val) {
        this.$emit("update:value", val);
      },
      deep: true,
    },
    "address.country": function (value) {
      this.loadingStates = true;
      getStates(value).then((response) => {
        this.states = response.data.states.map((state) => {
          return {
            text: state.name,
            value: parseInt(state.id),
          };
        });
        this.loadingStates = false;
      });
    },
    "address.state": function (value) {
      this.loadingCities = true;
      getCities(value).then((response) => {
        this.cities = response.data.cities.map((city) => {
          return {
            text: city.name,
            value: parseInt(city.id),
          };
        });
        this.loadingCities = false;
      });
    },
  },
  methods: {
    initData() {
      getCountries()
        .then((response) => {
          this.countries = response.data.countries.map((country) => {
            return { text: country.name, value: parseInt(country.id) };
          });
        })
        .catch((error) => {
          this.notifyErrors(error);
        });
    },
  },
};
</script>
