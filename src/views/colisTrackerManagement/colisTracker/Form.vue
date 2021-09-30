<template>
  <v-container grid-list-lg v-loading="loading" pt-2 pl-0 pr-0>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-layout row wrap>
        <v-flex xs12 sm4 md4>
          <v-text-field
            v-model="editedItem.name"
            label=" Name"
            class="required"
            :rules="rules.name"
            required
            :readonly="isReadonly"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-text-field
            v-model="editedItem.trackNumber"
            label=" trackNumber"
            class="required"
            :rules="rules.trackNumber"
            required
            :readonly="isReadonly"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-text-field
            v-model="editedItem.description"
            label="description"
            :readonly="isReadonly"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-autocomplete
            :items="status"
            v-model="editedItem.status"
            :rules="rules.status"
            label="status"
            class="required"
            required
            :readonly="isReadonly"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-autocomplete
            :items="providers"
            v-model="editedItem.provider"
            :rules="rules.provider"
            label="provider"
            class="required"
            required
            :readonly="isReadonly"
          ></v-autocomplete>
        </v-flex>

        <v-flex xs12 sm4 md4>
          <v-checkbox
            v-model="editedItem.isActive"
            :label="`active: ${editedItem.isActive.toString()}`"
          ></v-checkbox>
        </v-flex>
      </v-layout>
    </v-form>
    <v-layout align-end justify-center pt-4>
      <v-btn
        color="primary darken-1"
        flat
        round
        :disabled="loading"
        to="/colistracker/table"
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
import {
  createOne,
  updateOne,
  getOne,
} from "../../../api/colisTrackerManagement/colis_tracker";

export default {
  components: {},
  data() {
    return {
      providers: ["Amazon", "Microsoft", "Alibaba"],
      status: ["Validé", "Acheté", "Livré"],
      editedItem: {
        name: "",
        description: null,
        provider: null,
        status: null,
        trackNumber: null,
        isActive: true,
      },

      // Form Rules
      valid: false,
      loading: false,
      rules: {
        name: [(v) => !!v || "name is required"],
        description: [(v) => !!v || "description is required"],
        provider: [(v) => !!v || "provider is required"],
        status: [(v) => !!v || "status is required"],
        trackNumber: [(v) => !!v || "trackNumber is required"],
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

        if (this.$route.params.id) {
          const responseData = await getOne(this.$route.params.id);
          this.editedItem = { ...responseData.data.data };
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
          return this.$router.push({ name: "colisTrackerTable" });
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
