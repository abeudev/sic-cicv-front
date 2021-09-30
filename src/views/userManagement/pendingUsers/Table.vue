<template>
  <DataTable :table="table" ref="usersTable" />
</template>

<script>
import DataTable from "../../../components/helpers/DataTable";
import { updateUser } from "../../../api/userManagement/users";

export default {
  components: { DataTable },
  data() {
    return {
      table: {
        title: 'Pending Users Table',
        toolbar: {
          search: true,
          selectAll: true,
          exportButtons: true,
          daterange: {
            display: false,
            fieldName: 'createdAt'
          },
          filters: [
            {
              type: 'input',
              fieldName: 'firstName',
              label: 'First Name',
              value: ''
            },
            {
              type: 'input',
              fieldName: 'lastName',
              label: 'Last Name',
              value: ''
            },
            {
              type: 'input',
              fieldName: 'username',
              label: 'Username',
              value: ''
            },
            {
              type: 'input',
              fieldName: 'email',
              label: 'Email',
              value: ''
            },
            {
              type: 'select',
              options: ['Admin', 'User', 'Guest'],
              fieldName: 'role.name',
              label: 'Role',
              value: ''
            }
          ],
          topRightButtons: [
            {
              text: "Activate Users",
              icon: "check",
              isVisible: () => this.hasAccess(['admin']),
              action: () => {
                this.activateSelected();
              }
            }
          ]
        },
        filters: {
          isPending: true
        },
        settings: {
          url: "users/table",
          isServerSide: true,
          pagination: {
            sortBy: 'createdAt',
            descending: true,
            rowsPerPage: 25
          }
        },
        headers: [
          { text: "Name", align: "left" },
          { text: "Username" },
          { text: "Email" },
          { text: "Role" },
          { text: "Created At" }
        ],
        contents: [
          {
            data: "firstName",
            render: (data, full) => {
              return `${data} ${full.lastName || ''}`;
            }
          },
          { data: "username" },
          { 
            data: "email",
            render: data => {
              return `<button type="button" class="blue--text text-lowercase theme--dark v-btn v-btn--depressed v-btn--outline v-btn--round v-btn--small">
                    <div class="v-btn__content">${data}</div>
                  </button>`;
            },
            getRecord: data => {
              alert(`Column action. Get row data, email: ${data.email}`);
            }
          },
          { data: "role.name" },
          { data: "role.level", hideColumn: true },
          {
            data: "createdAt",
            render: data => {
              return this.timeZone(data, 'DD MMM YYYY H:mm z');
            }
          },
          { data: "lastName", hideColumn: true }
        ],
        actions: [
          {
            text: "Activate User",
            icon: "check",
            color: "green",
            isVisible: data => data.role.level > -1 && this.hasAccess(['admin']),
            getRecord: async data => {
              await this.activateUser(data._id);
            }
          }
        ]
      }
    };
  },
  methods: {
    async activateUser(id) {
      const body = {
        _id: id,
        isActive: true,
        isPending: false
      };
      const activate = await this.$root.$confirm(
        "Activate?",
        "Are you sure you want to activate this user?",
        { color: "success lighten-1" }
      );
      try {
        if (activate) {
          this.$root.$dialogLoader.show('Please wait...', { color: 'primary' });
          await updateUser(body);
          this.$root.$dialogLoader.hide();
          this.$refs.usersTable.refreshTable();
          this.$snotify.success("User activated", "Success");
        }
      } catch (error) {
        this.$snotify.error("Failed to activate User!", "Error");
        this.$root.$dialogLoader.hide();
      }
    },
    async activateSelected() {
      const users = JSON.parse(JSON.stringify(this.table.selected));
      if (users.length < 1) return this.$snotify.error("Please select Users", "Error");
      const activate = await this.$root.$confirm(
        "Activate?",
        "Are you sure you want to activate selected users?",
        { color: "success lighten-1" }
      );
      try {
        if (activate) {
          this.$root.$dialogLoader.show('Please wait...', { color: 'primary' });
          const activateUsers = users.map(user => {
            return updateUser({
              _id: user._id,
              isActive: true,
              isPending: false
            });
          });
          await Promise.all(activateUsers);
          this.$root.$dialogLoader.hide();
          this.$refs.usersTable.refreshTable();
          this.$snotify.success("Selected users activated", "Success");
        }
      } catch (error) {
        this.$snotify.error("Failed to activate user!", "Error");
        this.$root.$dialogLoader.hide();
      }
    },
  }
};
</script>