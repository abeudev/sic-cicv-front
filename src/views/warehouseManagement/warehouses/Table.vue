<template>
  <div>
    <DataTable :table="table" ref="warehouseTable" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { updateOne } from "../../../api/warehouseManagement/warehouses";
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
        title: "warehouses Table",
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
              label: " Name",
              value: "",
            },
            {
              type: "input",
              fieldName: "location",
              label: "Location",
              value: "",
            },
            {
              type: "input",
              fieldName: "description",
              label: "Description",
              value: "",
            },
          ],
          topRightButtons: [
            {
              text: "Add warehouse",
              icon: "add",
              isVisible: () => this.hasAccess(["write", "admin"]),
              action: () => {
                this.$router.push({ name: "warehouseAdd" });
              },
            },
            {
              groupName: "moreActions",
              text: "Archive Selected",
              icon: "clear_all",
              isVisible: () => this.hasAccess(["admin"]),
              action: () => {
                this.archiveSelected();
              },
            },
            {
              groupName: "moreActions",
              text: "Assign Permission",
              icon: "lock",
              isVisible: () => this.hasAccess(["admin"]),
              action: () => {
                this.openRolesModal();
              },
            },
          ],
        },
        filters: {
          //isPending: false,
        },
        settings: {
          url: "warehouse/table",
          isServerSide: true,
          pagination: {
            sortBy: "createdAt",
            descending: true,
            rowsPerPage: 25,
          },
        },
        headers: [
          { text: "Name", align: "left" },
          { text: "location" },
          { text: "description" },

          { text: "Created At" },
        ],
        contents: [
          {
            data: "name",
          },
          { data: "location" },
          {
            data: "description",
          },
          { data: "role.name" },
          { data: "role.level", hideColumn: true },
          { data: "role._id", hideColumn: true },
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
            isVisible: (data) =>
              this.hasAccess(["read", "write", "admin"]) && !this.isSelf(data),
            getRecord: (data) => {
              this.$router.push({ name: "warehouseEdit2", params: { id: data._id } });
            },
          },
          {
            text: "Delete Data",
            icon: "delete",
            color: "red accent-2",
            isVisible: (data) => this.hasAccess(["admin"]) && !this.isSelf(data),
            getRecord: async (data) => {
              const archived = await archiveItem(this, "warehouse", data._id);
              if (archived) this.$refs.warehouseTable.refreshTable();
            },
          },
          {
            text: "Activate Data",
            icon: "check",
            color: "green",
            showInArchived: true,
            isVisible: (data) => this.hasAccess(["admin"]) && !this.isSelf(data),
            getRecord: async (data) => {
              const activated = await activateItem(this, "warehouse", data._id);
              if (activated) this.$refs.warehouseTable.refreshTable();
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
     * Open roles modal and send selected warehouse to roles modal component
     */
    openRolesModal() {
      const users = JSON.parse(JSON.stringify(this.table.selected));
      const filtered = users.filter((user) => !this.isSelf(user));
      if (filtered.length < 1)
        return this.$snotify.error("Please select users other than yourself", "Error");
      this.selectedUsers = filtered;
      this.isModalOpen = true;
    },
    /**
     * Archive selected users
     */
    async archiveSelected() {
      const users = JSON.parse(JSON.stringify(this.table.selected));
      const filtered = users.filter((user) => !this.isSelf(user));
      if (filtered.length < 1)
        return this.$snotify.error("Please select users other than yourself", "Error");
      const del = await this.$root.$confirm(
        "Archive?",
        "Are you sure you want to archive selected users?",
        { color: "error lighten-1" }
      );
      try {
        if (del) {
          this.$root.$dialogLoader.show("Please wait...", { color: "primary" });
          const archiveUsers = filtered.map((user) => {
            return updateOne({
              _id: user._id,
              isActive: false,
            });
          });
          await Promise.all(archiveUsers);
          this.$root.$dialogLoader.hide();
          this.$refs.warehouseTable.refreshTable();
          this.$snotify.success("Selected warehouses archived", "Success");
        }
      } catch (error) {
        this.$snotify.error("Failed to archive user!", "Error");
        this.$root.$dialogLoader.hide();
      }
    },
  },
};
</script>
