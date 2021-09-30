<template>
  <div>
    <v-alert
      :value="true"
      color="info"
      icon="info"
      outline
      class="mt-3 py-0"
    >
      Please open the file for more details. See the sample codes here
      <code-usage :code="sampleCode" width="800px" />
    </v-alert>
    <DataTable :table="table" ref="ServerSide" />
  </div>
</template>

<script>
import DataTable from "../../helpers/DataTable";
import sampleData from "./sampleData.json";
import CodeUsage from "../../helpers/CodeUsage";
import sampleCode from "./codeSamples/ServerSide";

export default {
  components: { DataTable, CodeUsage },
  data() {
    return {
      sampleCode,
      table: {
        title: 'Server Side Table',
        /** 
         * Toolbars
         * Remove the toolbar field or choose field inside to remove if unnecessary.
        */
        toolbar: {
          archivedTableSwitcher: true,
          search: true,
          selectAll: true,
          exportButtons: true,
          daterange: {
            display: false,
            fieldName: 'createdAt'
          },
          /**
           * Custom Filters -> Only available in "input" and "select" type
           */
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
            /** 
             * Action Buttons
             * Default properties {text, icon, isVisible(), action()}. Remove if unnecessary.
             * @param data the parameter to get data
            */
            {
              text: "Add Item", // Button Text
              icon: "add", // Button Icon,
              isVisible: () => this.hasAccess(['read', 'write', 'admin']),
              action: () => { // Action
                // Your method here
                this.$router.push({ name: 'index' });
              }
            },
            {
              groupName: "moreActions", // Grouping buttons, should be camelCase
              text: "Get Selected",
              icon: "filter_list",
              isVisible: () => this.hasAccess(['read', 'write', 'admin']),
              action: () => {
                alert(JSON.stringify(this.table.selected, null, '  '));
              }
            },
            {
              groupName: "moreActions",
              text: "Another Action",
              isVisible: () => this.hasAccess(['read', 'write', 'admin']),
              action: () => {
                alert('Another action triggered');
              }
            }
          ]
        },
        /**
         * Table Settings
         * ? isServerSide by default is true and must provide url
         * ? You have to provide array of data if isServerSide is false
         * ! Must assign url or data
        */
        settings: {
          url: "users/table",
          isServerSide: true,
          pagination: {
            sortBy: 'createdAt', // * Initiate default sort
            descending: true, // * Default is false
            rowsPerPage: 25 // * Default is 10
          }
        },
        /** 
         * Header
         * props: {text: "Header Name", align: "center/left/right", sortable: true/false}
         * ! required
        */
        headers: [
          { text: "Name", align: "left" },
          { text: "Username" },
          { text: "Email" },
          { text: "Role", sortable: false },
          { text: "Created At" }
        ],
        /** 
         * Content for rendering
         * props: {data, className, render(), getRecord()}
         * @param data the parameter for getRecord() and render() to get record
         * ! required
        */
        contents: [
          {
            data: "firstName", // Field Name
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
              // Your method here
              alert(`Column action. Get row data, email: ${data.email}`);
            }
          },
          { data: "role.name" },
          {
            data: "createdAt",
            render: data => {
              return this.timeZone(data, 'DD MMM YYYY H:mm z');
            }
          },
          { data: "lastName", hideColumn: true }
        ],
        actions: [
          /** 
           * Actions buttons and get record. Remove if unnecessary.
           * props: {text, icon, color, isVisible(), getRecord()}
           * @param data the parameter for getRecord() to get record
          */
          {
            text: "View Data",
            icon: "remove_red_eye",
            color: "orange",
            isVisible: data => this.hasAccess(['read', 'write', 'admin']),
            getRecord: data => {
              // Your method here
              alert(JSON.stringify(data, null, '  '));
            }
          },
          {
            text: "View or Edit",
            icon: "mdi-lead-pencil",
            color: "teal lighten-2",
            getRecord: data => {
              // Your method here
              alert(JSON.stringify(data, null, '  '));
            }
          },
          {
            text: "Delete Data",
            icon: "delete",
            color: "red accent-2",
            getRecord: data => {
              // Your method here
              alert(JSON.stringify(data, null, '  '));
            }
          }
        ]
      }
    };
  },
  watch: {
    'table.selected': function(val) {
      console.log(val);
    }
  }
};
</script>