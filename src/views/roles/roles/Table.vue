<template>
  <div>
    <DataTable :table="table" ref="rolesTable" />
    <users-modal 
      ref="usersModal" 
      :users.sync="users"
      :loading.sync="loading"
      :isModalOpen.sync="isModalOpen"
      :roleID="roleID"
    />
  </div>
</template>

<script>
import DataTable from "../../../components/helpers/DataTable";
import UsersModal from './UsersModal'
import { getUsersByRole } from '../../../api/userManagement/roles'
import { archiveItem, activateItem } from "../../../components/helpers/jsUtills/jsAction";

export default {
  components: { DataTable, UsersModal },
  data() {
    return {
      table: {
        title: 'Roles Table',
        toolbar: {
          archivedTableSwitcher: true,
          search: true,
          daterange: {
            display: false,
            fieldName: 'createdAt'
          },
          topRightButtons: [
            {
              text: "Add Role",
              icon: "add",
              isVisible: () => this.hasAccess(['write', 'admin']),
              action: () => {
                this.$router.push({ name: 'rolesAdd' });
              }
            }
          ]
        },
        filters: {
          level: { $gt: -1 },
        },
        settings: {
          url: "roles/table",
          isServerSide: true,
          pagination: {
            sortBy: 'createdAt',
            descending: true,
            rowsPerPage: 25
          }
        },
        headers: [
          { text: "Name", align: "left" },
          { text: "Permissions" },
          { text: "Created At", width: 150 }
        ],
        contents: [
          {
            data: "name",
            render: (data, full) => {
              return `${data}`;
            }
          },
          { 
            data: "permissions",
            className: "py-2",
            render: data => {
              let menus = "";
              if(!data) return menus;
              data.map((menu, i) => {
                if (i < 9) {
                  menus += `<span tabindex="0" class="v-chip v-chip--outline v-chip--small theme--light secondary secondary--text">
                      <span class="v-chip__content">${menu.title}</span>
                    </span>`;
                }
              });
              return menus;
            }
          },
          {
            data: "createdAt",
            render: data => {
              return this.timeZone(data, 'DD MMM YYYY H:mm z');
            }
          },
          { data: "level", hideColumn: true },
          { data: "type", hideColumn: true }
        ],
        actions: [
          {
            text: "View or Edit",
            icon: "mdi-lead-pencil",
            color: "teal lighten-2",
            isVisible: data => data.level > -1 && this.hasAccess(['read', 'write', 'admin']),
            getRecord: data => {
              this.$router.push({ name: 'rolesEdit', params: { id: data._id } });
            }
          },
          /**
           * Before delete a role, check if role is used by users
           * if used, the assigned user role with that role should be changed
           */
          {
            text: "Delete Data",
            icon: "delete",
            color: "red accent-2",
            isVisible: data => data.level > -1 && this.hasAccess(['admin']) && data.type != 'default',
            getRecord: async data => {
              this.$root.$dialogLoader.show('Please wait...', { color: 'primary' });
              const users = await getUsersByRole(data._id);
              this.$root.$dialogLoader.hide();
              if (users.data.data.length > 0) {
                this.openUsersModal(users.data.data, data._id);
              } else {
                const archived = await archiveItem(this, 'roles', data._id);
                if (archived) this.$refs.rolesTable.refreshTable();
              }
            }
          },
          {
            text: "Activate Data",
            icon: "check",
            color: "green",
            showInArchived: true,
            isVisible: data => data.level > -1 && this.hasAccess(['admin']),
            getRecord: async data => {
              const activated = await activateItem(this, 'roles', data._id);
              if (activated) this.$refs.rolesTable.refreshTable();
            }
          }
        ]
      },
      users: [],
      roleID: null,
      isModalOpen: false,
      loading: false
    };
  },
  methods: {
    /**
     * Open user modal to update the roles
     * @param {Array} users
     * @param {String} roleID
     */
    openUsersModal(users, roleID) {
      this.users = JSON.parse(JSON.stringify(users));
      this.roleID = roleID;
      this.isModalOpen = true;
    }
  }
};
</script>