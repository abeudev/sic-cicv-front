<template>
  <DataTable :table="table" ref="warehousesTable" />
</template>

<script>
import DataTable from "../../components/helpers/DataTable.vue";
import { updateWarehouse } from "../../api/warehouses/warehouses";
import { archiveItem, activateItem } from "../../components/helpers/jsUtills/jsAction";

export default {
  components: { DataTable },
  data() {
    return {
      table: {
        title: "Table Entrepôts",
        toolbar: {
          archivedTableSwitcher: true,
          search: true,
          selectAll: true,
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
              fieldName: "description",
              label: "descriptions",
              value: "",
            },
          ],
          topRightButtons: [
            {
              text: "Add Warehouse",
              icon: "add",
              isVisible: () => this.hasAccess(["write", "admin"]),
              action: () => {
                this.$router.push({ name: "warehousesAdd" });
              },
            },
            {
              text: "Archive Selected",
              icon: "clear_all",
              isVisible: () => this.hasAccess(["admin"]),
              action: () => {
                this.archiveSelected();
              },
            },
          ],
        },
        settings: {
          url: "warehouses/table",
          isServerSide: true,
          pagination: {
            sortBy: "createdAt",
            descending: true,
            rowsPerPage: 25,
          },
        },
        headers: [
          { text: "Name", align: "left" },
          { text: "Descriptions" },
          { text: "location" },
          { text: "Created At" },
        ],
        contents: [
          { data: "name" },
          {
            data: "description",
            render: (data) => {
              const description = data.substr(0, 30);
              return description;
            },
          },
          {
            data: "location",
            className: "py-2",
            render: (data) => {
              let location = "";
              if (!data) return location;
              data.map((location) => {
                location += `<span tabindex="0" class="v-chip v-chip--outline v-chip--small theme--light secondary secondary--text">
                    <span class="v-chip__content">${location}</span>
                  </span>`;
              });
              return location;
            },
          },
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
              this.$router.push({ name: "warehousesEdit", params: { id: data._id } });
            },
          },
          {
            text: "Delete Data",
            icon: "delete",
            color: "red accent-2",
            isVisible: () => this.hasAccess(["admin"]),
            getRecord: async (data) => {
              const archived = await archiveItem(this, "warehouses", data._id);
              if (archived) this.$refs.warehousesTable.refreshTable();
            },
          },
          {
            text: "Activate Data",
            icon: "check",
            color: "green",
            showInArchived: true,
            isVisible: () => this.hasAccess(["admin"]),
            getRecord: async (data) => {
              const activated = await activateItem(this, "warehouses", data._id);
              if (activated) this.$refs.warehousesTable.refreshTable();
            },
          },
        ],
      },
    };
  },
  methods: {
    /**
     * Archive selected Items
     */
    async archiveSelected() {
      const warehouses = JSON.parse(JSON.stringify(this.table.selected));
      if (warehouses.length < 1)
        return this.$snotify.error("Please select a warehouse", "Error");
      const del = await this.$root.$confirm(
        "Archive?",
        "Are you sure you want to archive selected warehouses?",
        { color: "error lighten-1" }
      );
      try {
        if (del) {
          this.$root.$dialogLoader.show("Please wait...", { color: "primary" });
          const archiveWarehouses = warehouses.map((warehouse) => {
            return updateWarehouse({
              _id: warehouse._id,
              isActive: false,
            });
          });
          await Promise.all(archiveWarehouses);
          this.$root.$dialogLoader.hide();
          this.$refs.warehousesTable.refreshTable();
          this.$snotify.success("Selected warehouses archived", "Success");
        }
      } catch (error) {
        this.$snotify.error("Failed to archive Warehouse!", "Error");
        this.$root.$dialogLoader.hide();
      }
    },
  },
};
</script>
