<template>
  <div>
    <DataTable :table="table" ref="colisTable" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { updateOne } from "../../../api/colisManagement/colis";
import { archiveItem, activateItem } from "../../../components/helpers/jsUtills/jsAction";
import DataTable from "../../../components/helpers/DataTable";

export default {
  components: { DataTable },
  data() {
    return {
      /**
       * Datatable required properties.
       * Please open the documentation file for more info and usage.
       */
      table: {
        title: "Envois terminés",
        filters: { transaction_status: "complet" },
        settings: {
          url: "colis/table",
          isServerSide: true,
          pagination: {
            sortBy: "createdAt",
            descending: true,
            rowsPerPage: 25,
          },
        },
        toolbar: {
          archivedTableSwitcher: true,
          search: true,
          selectAll: true,
          exportButtons: true,
          daterange: {
            display: false,
            fieldName: "createdAt",
          },

          filters: [
            {
              type: "input",
              fieldName: "name",
              label: "name",
              value: "",
            },
            {
              type: "input",
              fieldName: "track_number",
              label: "track_number",
              value: "",
            },
            {
              type: "input",
              fieldName: "withdrawal_code",
              label: "withdrawal_code",
              value: "",
            },
            {
              type: "input",
              fieldName: "transaction_ID",
              label: "transaction_ID",
              value: "",
            },
            {
              type: "input",
              fieldName: "payment_status",
              label: "payment_status",
              value: "",
            },
            {
              type: "input",
              fieldName: "departure_customer_ID",
              label: "departure_customer_ID",
              value: "",
            },
            {
              type: "input",
              fieldName: "arrival_customer_ID",
              label: "arrival_customer_ID",
              value: "",
            },
            {
              type: "input",
              fieldName: "transaction_status",
              label: "transaction_status",
              value: "",
            },
            {
              type: "input",
              fieldName: "delivery",
              label: "delivery",
              value: "",
            },
            {
              type: "input",
              fieldName: "delivery_place",
              label: "delivery_place",
              value: "",
            },
            {
              type: "input",
              fieldName: "delivery_date",
              label: "delivery_date",
              value: "",
            },
            {
              type: "input",
              fieldName: "delivery_startTime",
              label: "delivery_startTime",
              value: "",
            },
            {
              type: "input",
              fieldName: "delivery_endTime",
              label: "delivery_endTime",
              value: "",
            },
            {
              type: "input",
              fieldName: "description",
              label: "description",
              value: "",
            },
            {
              type: "input",
              fieldName: "isActive",
              label: "isActive",
              value: "",
            },
            {
              type: "input",
              fieldName: "createdAt",
              label: "Created At",
              value: "",
            },
          ],
        },

        headers: [
          { text: "name" },
          { text: "track_number" },
          { text: "withdrawal_code" },
          { text: "transaction_ID" },
          { text: "payment_status" },

          { text: "departure_customer_ID" },
          { text: "arrival_customer_ID" },
          { text: "transaction_status" },
          { text: "delivery" },
          { text: "delivery_place" },
          { text: "delivery_date" },
          { text: "delivery_startTime" },
          { text: "delivery_endTime" },
          { text: "description" },
          { text: "isActive" },
          { text: "Created At" },
        ],
        contents: [
          { data: "name" },
          { data: "track_number" },
          { data: "withdrawal_code" },
          { data: "transaction_ID" },
          { data: "payment_status" },

          { data: "departure_customer_ID" },
          { data: "arrival_customer_ID" },
          { data: "transaction_status" },
          { data: "delivery" },
          { data: "delivery_place" },
          {
            data: "delivery_date",
            render: (data) => {
              return this.timeZone(data, "DD MMM YYYY H:mm z");
            },
          },
          { data: "delivery_startTime" },
          { data: "delivery_endTime" },
          { data: "description" },
          { data: "isActive" },
          {
            data: "createdAt",
            render: (data) => {
              return this.timeZone(data, "DD MMM YYYY H:mm z");
            },
          },
        ],
        actions: [
          {
            text: "View or Edit",
            icon: "mdi-lead-pencil",
            color: "teal lighten-2",
            isVisible: () => this.hasAccess(["read", "write", "admin"]),
            getRecord: (data) => {
              this.$router.push({ name: "colisEdit", params: { id: data._id } });
            },
          },
          {
            text: "Delete Data",
            icon: "delete",
            color: "red accent-2",
            isVisible: (data) => this.hasAccess(["admin"]) && !this.isSelf(data),
            getRecord: async (data) => {
              const archived = await archiveItem(this, "colis", data._id);
              if (archived) this.$refs.colisTable.refreshTable();
            },
          },
          {
            text: "Activate Data",
            icon: "check",
            color: "green",
            showInArchived: true,
            isVisible: (data) => this.hasAccess(["admin"]) && !this.isSelf(data),
            getRecord: async (data) => {
              const activated = await activateItem(this, "colis", data._id);
              if (activated) this.$refs.colisTable.refreshTable();
            },
          },
        ],
      },
      selectedUsers: [],
      isModalOpen: false,
      loading: false,
    };
  },
  computed: {
    /**
     * Import getters helper from Vuex
     */
    ...mapGetters({ user: "user/profile" }),
  },
  methods: {
    /**
     * Check if user
     */
    isSelf(data) {
      return data._id == this.user._id;
    },

    /**
     * Archive selected datas
     */
    async archiveSelected() {
      const datas = JSON.parse(JSON.stringify(this.table.selected));
      const filtered = datas.filter((data) => !this.isSelf(data));
      if (filtered.length < 1)
        return this.$snotify.error("Please select datas other than yourself", "Error");
      const del = await this.$root.$confirm(
        "Archive?",
        "Are you sure you want to archive selected datas?",
        { color: "error lighten-1" }
      );
      try {
        if (del) {
          this.$root.$dialogLoader.show("Please wait...", { color: "primary" });
          const archiveUsers = filtered.map((data) => {
            return updateOne({
              _id: data._id,
              isActive: false,
            });
          });
          await Promise.all(archiveUsers);
          this.$root.$dialogLoader.hide();
          this.$refs.colisTable.refreshTable();
          this.$snotify.success("Selected datas archived", "Success");
        }
      } catch (error) {
        this.$snotify.error("Failed to archive data!", "Error");
        this.$root.$dialogLoader.hide();
      }
    },
  },
};
</script>
