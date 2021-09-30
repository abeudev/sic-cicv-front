<template>
  <div>
    <DataTable :table="table" ref="colisTypeTable" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { updateOne } from "../../../api/colisTypeManagement/colis_type";
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
        title: "Colis type Table",
        filters: {},
        settings: {
          url: "colistype/table",
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
          topRightButtons: [
            {
              text: "Add Colis type",
              icon: "add",
              isVisible: () => this.hasAccess(["write", "admin"]),
              action: () => {
                this.$router.push({ name: "colisTypeAdd" });
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
          ],
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
              label: "description",
              value: "",
            },
            {
              type: "input",
              fieldName: "isActive",
              label: "isActive",
              value: "",
            },
          ],
        },

        headers: [
          { text: "name", align: "left" },
          { text: "description" },
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
            text: "View or Edit",
            icon: "mdi-lead-pencil",
            color: "teal lighten-2",
            isVisible: () => this.hasAccess(["read", "write", "admin"]),
            getRecord: (data) => {
              this.$router.push({ name: "colisTypeEdit", params: { id: data._id } });
            },
          },
          {
            text: "Delete Data",
            icon: "delete",
            color: "red accent-2",
            isVisible: (data) => this.hasAccess(["admin"]) && !this.isSelf(data),
            getRecord: async (data) => {
              const archived = await archiveItem(this, "colistype", data._id);
              if (archived) this.$refs.colisTypeTable.refreshTable();
            },
          },
          {
            text: "Activate Data",
            icon: "check",
            color: "green",
            showInArchived: true,
            isVisible: (data) => this.hasAccess(["admin"]) && !this.isSelf(data),
            getRecord: async (data) => {
              const activated = await activateItem(this, "colistype", data._id);
              if (activated) this.$refs.colisTypeTable.refreshTable();
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
          this.$refs.colisTypeTable.refreshTable();
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
