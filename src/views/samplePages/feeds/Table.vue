<template>
  <DataTable :table="table" ref="feedsTable" />
</template>

<script>
import DataTable from "../../../components/helpers/DataTable";
import { updateFeed } from "../../../api/samplePages/feeds"
import { archiveItem, activateItem } from "../../../components/helpers/jsUtills/jsAction";

export default {
  components: { DataTable },
  data() {
    return {
      table: {
        title: 'Feeds Table',
        toolbar: {
          archivedTableSwitcher: true,
          search: true,
          selectAll: true,
          daterange: {
            display: false,
            fieldName: 'createdAt'
          },
          filters: [
            {
              type: 'input',
              fieldName: 'title',
              label: 'Title',
              value: ''
            },
            {
              type: 'input',
              fieldName: 'caption',
              label: 'Captions',
              value: ''
            }
          ],
          topRightButtons: [
            {
              text: "Add Feed",
              icon: "add",
              isVisible: () => this.hasAccess(['write', 'admin']),
              action: () => {
                this.$router.push({ name: 'feedsAdd' });
              }
            },
            {
              text: "Archive Selected",
              icon: "clear_all",
              isVisible: () => this.hasAccess(['admin']),
              action: () => {
                this.archiveSelected();
              }
            }
          ]
        },
        settings: {
          url: "feeds/table",
          isServerSide: true,
          pagination: {
            sortBy: 'createdAt',
            descending: true,
            rowsPerPage: 25
          }
        },
        headers: [
          { text: "Title", align: "left" },
          { text: "Captions" },
          { text: "Tags" },
          { text: "Created At" }
        ],
        contents: [
          { data: "title" },
          { 
            data: "caption",
            render: data => {
              const caption = data.substr(0, 30);
              return caption;
            }
          },
          { 
            data: "tags",
            className: "py-2",
            render: data => {
              let tags = "";
              if(!data) return tags;
              data.map(tag => {
                tags += `<span tabindex="0" class="v-chip v-chip--outline v-chip--small theme--light secondary secondary--text">
                    <span class="v-chip__content">${tag}</span>
                  </span>`;
              });
              return tags;
            }
          },
          {
            data: "createdAt",
            render: data => {
              return this.timeZone(data, 'DD MMM YYYY H:mm z');
            }
          }
        ],
        actions: [
          {
            text: "View or Edit",
            icon: "mdi-lead-pencil",
            color: "teal lighten-2",
            isVisible: () => this.hasAccess(['read', 'write', 'admin']),
            getRecord: data => {
              this.$router.push({ name: 'feedsEdit', params: { id: data._id } });
            }
          },
          {
            text: "Delete Data",
            icon: "delete",
            color: "red accent-2",
            isVisible: () => this.hasAccess(['admin']),
            getRecord: async data => {
              const archived = await archiveItem(this, 'feeds', data._id);
              if (archived) this.$refs.feedsTable.refreshTable();
            }
          },
          {
            text: "Activate Data",
            icon: "check",
            color: "green",
            showInArchived: true,
            isVisible: () => this.hasAccess(['admin']),
            getRecord: async data => {
              const activated = await activateItem(this, 'feeds', data._id);
              if (activated) this.$refs.feedsTable.refreshTable();
            }
          }
        ]
      }
    };
  },
  methods: {
    /**
     * Archive selected Items
     */
    async archiveSelected() {
      const feeds = JSON.parse(JSON.stringify(this.table.selected));
      if (feeds.length < 1) return this.$snotify.error("Please select a feed", "Error");
      const del = await this.$root.$confirm(
        "Archive?",
        "Are you sure you want to archive selected feeds?",
        { color: "error lighten-1" }
      );
      try {
        if (del) {
          this.$root.$dialogLoader.show('Please wait...', { color: 'primary' });
          const archiveFeeds = feeds.map(feed => {
            return updateFeed({
              _id: feed._id,
              isActive: false
            });
          });
          await Promise.all(archiveFeeds);
          this.$root.$dialogLoader.hide();
          this.$refs.feedsTable.refreshTable();
          this.$snotify.success("Selected feeds archived", "Success");
        }
      } catch (error) {
        this.$snotify.error("Failed to archive feed!", "Error");
        this.$root.$dialogLoader.hide();
      }
    }
  }
};
</script>