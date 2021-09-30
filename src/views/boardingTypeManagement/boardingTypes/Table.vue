<template>
  <div>
    <DataTable :table="table" ref="boardingTypesTable" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { updateUser } from "../../../api/boardingTypeManagement/boardingTypes";
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
        title: "liste des types d'embarquement",
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
              fieldName: "description",
              label: "Description",
              value: "",
            },
          ],
          topRightButtons: [
            {
              text: "Ajouter un type d'embarquement",
              icon: "add",
              isVisible: () => this.hasAccess(["write", "admin"]),
              action: () => {
                this.$router.push({ name: "boardingTypesAdd" });
              },
            },
            {
              groupName: "moreActions",
              text: "Archiver la selection",
              icon: "clear_all",
              isVisible: () => this.hasAccess(["admin"]),
              action: () => {
                this.archiveSelected();
              },
            },
          ],
        },
        filters: {},
        settings: {
          url: "boardingtype/table",
          isServerSide: true,
          pagination: {
            sortBy: "createdAt",
            descending: true,
            rowsPerPage: 25,
          },
        },
        headers: [
          { text: "Libellé", align: "left" },
          { text: "Description" },
          { text: "Created At" },
        ],
        contents: [
          {
            data: "name",
          },
          { data: "description" },
          {
            data: "createdAt",
            render: (data) => {
              return this.timeZone(data, "DD MMM YYYY H:mm z");
            },
          },
        ],
        actions: [
          {
            text: "Voir ou modifier",
            icon: "mdi-lead-pencil",
            color: "teal lighten-2",
            isVisible: (data) =>
              this.hasAccess(["read", "write", "admin"]) && !this.isSelf(data),
            getRecord: (data) => {
              this.$router.push({ name: "boardingTypesEdit", params: { id: data._id } });
            },
          },
          {
            text: "Delete Data",
            icon: "delete",
            color: "red accent-2",
            isVisible: (data) => this.hasAccess(["admin"]) && !this.isSelf(data),
            getRecord: async (data) => {
              const archived = await archiveItem(this, "boardingType", data._id);
              if (archived) this.$refs.boardingTypesTable.refreshTable();
            },
          },
          {
            text: "Activate Data",
            icon: "check",
            color: "green",
            showInArchived: true,
            isVisible: (data) => this.hasAccess(["admin"]) && !this.isSelf(data),
            getRecord: async (data) => {
              const activated = await activateItem(this, "boardingType", data._id);
              if (activated) this.$refs.boardingTypesTable.refreshTable();
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
     * Open roles modal and send selected users to roles modal component
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
            return updateUser({
              _id: user._id,
              isActive: false,
            });
          });
          await Promise.all(archiveUsers);
          this.$root.$dialogLoader.hide();
          this.$refs.boardingTypesTable.refreshTable();
          this.$snotify.success("Selected users archived", "Success");
        }
      } catch (error) {
        this.$snotify.error("Failed to archive user!", "Error");
        this.$root.$dialogLoader.hide();
      }
    },
  },
};
</script>
