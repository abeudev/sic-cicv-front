<template>
  <div>
    <DataTable :table="table" ref="usersTable" />
    <roles-modal
      ref="rolesModal"
      :users.sync="selectedUsers"
      :loading.sync="loading"
      :isModalOpen.sync="isModalOpen"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { updateUser } from "../../../api/userManagement/users";
import { archiveItem, activateItem } from "../../../components/helpers/jsUtills/jsAction";
import DataTable from "../../../components/helpers/DataTable";
import RolesModal from "./RolesModal";

export default {
  components: { DataTable, RolesModal },
  data() {
    return {
      /**
       * Datatable required properties.
       * Please open the documentation file for more info and usage.
       */
      table: {
        title: "Users Table",
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
              fieldName: "firstName",
              label: "First Name",
              value: "",
            },
            {
              type: "input",
              fieldName: "lastName",
              label: "Last Name",
              value: "",
            },
            {
              type: "input",
              fieldName: "username",
              label: "Username",
              value: "",
            },
            {
              type: "input",
              fieldName: "email",
              label: "Email",
              value: "",
            },
            {
              type: "select",
              options: ["Admin", "User", "Guest"],
              fieldName: "role.name",
              label: "Role",
              value: "",
            },
          ],
          topRightButtons: [
            {
              text: "Add User",
              icon: "add",
              isVisible: () => this.hasAccess(["write", "admin"]),
              action: () => {
                this.$router.push({ name: "usersAdd" });
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
          isPending: false,
        },
        settings: {
          url: "users/table",
          isServerSide: true,
          pagination: {
            sortBy: "createdAt",
            descending: true,
            rowsPerPage: 25,
          },
        },
        headers: [
          { text: "Name", align: "left" },
          { text: "Username" },
          { text: "Email" },
          { text: "Role" },
          { text: "Created At" },
        ],
        contents: [
          {
            data: "firstName",
            render: (data, full) => {
              return `${data || ""} ${full.lastName || ""}`;
            },
          },
          { data: "username" },
          {
            data: "email",
            render: (data) => {
              return `<button type="button" class="blue--text text-lowercase theme--dark v-btn v-btn--depressed v-btn--outline v-btn--round v-btn--small">
                    <div class="v-btn__content">${data}</div>
                  </button>`;
            },
            getRecord: (data) => {
              alert(`Column action. Get row data, email: ${data.email}`);
            },
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
          { data: "lastName", hideColumn: true },
        ],
        actions: [
          {
            text: "View or Edit",
            icon: "mdi-lead-pencil",
            color: "teal lighten-2",
            isVisible: (data) =>
              data.role.level > -1 &&
              this.hasAccess(["read", "write", "admin"]) &&
              !this.isSelf(data),
            getRecord: (data) => {
              this.$router.push({ name: "usersEdit", params: { id: data._id } });
            },
          },
          {
            text: "Delete Data",
            icon: "delete",
            color: "red accent-2",
            isVisible: (data) =>
              data.role.level > -1 && this.hasAccess(["admin"]) && !this.isSelf(data),
            getRecord: async (data) => {
              const archived = await archiveItem(this, "users", data._id);
              if (archived) this.$refs.usersTable.refreshTable();
            },
          },
          {
            text: "Activate Data",
            icon: "check",
            color: "green",
            showInArchived: true,
            isVisible: (data) =>
              data.role.level > -1 && this.hasAccess(["admin"]) && !this.isSelf(data),
            getRecord: async (data) => {
              const activated = await activateItem(this, "users", data._id);
              if (activated) this.$refs.usersTable.refreshTable();
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
          this.$refs.usersTable.refreshTable();
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
