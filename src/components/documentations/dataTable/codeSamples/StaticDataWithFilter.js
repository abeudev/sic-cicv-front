const data = `
<DataTable :table="table" ref="StaticDataWithFilter" />

export default {
  data() {
    return {
      table: {
        title: 'Static Data with Filter Table',
        toolbar: {
          archivedTableSwitcher: false,
          search: true,
          selectAll: true,
          exportButtons: true,
          daterange: {
            display: true,
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
              text: "Add Item", 
              icon: "add", 
              isVisible: () => this.hasAccess(['read', 'write', 'admin']),
              action: () => { 
                this.$router.push({ name: 'index' });
              }
            },
            {
              groupName: "moreActions", 
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
        settings: {
          isServerSide: false,
          loading: false,
          data: [],
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
          { text: "Role", sortable: false },
          { text: "Created At" }
        ],
        contents: [
          {
            data: "firstName", 
            render: (data, full) => {
              return data + full.lastName;
            }
          },
          { data: "username" },
          { 
            data: "email",
            render: data => {
              return '<button type="button" class="blue--text text-lowercase theme--dark v-btn v-btn--depressed v-btn--outline v-btn--round v-btn--small">
                    <div class="v-btn__content">' + data + '</div>
                  </button>';
            },
            getRecord: data => {
              alert('Column action. Get row data, email: ' + data.email);
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
          {
            text: "View Data",
            icon: "remove_red_eye",
            color: "orange",
            isVisible: data => this.hasAccess(['read', 'write', 'admin']),
            getRecord: data => {
              alert(JSON.stringify(data, null, '  '));
            }
          },
          {
            text: "View or Edit",
            icon: "mdi-lead-pencil",
            color: "teal lighten-2",
            getRecord: data => {
              alert(JSON.stringify(data, null, '  '));
            }
          },
          {
            text: "Delete Data",
            icon: "delete",
            color: "red accent-2",
            getRecord: data => {
              alert(JSON.stringify(data, null, '  '));
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.table.settings.loading = true;
      setTimeout(() => {
        this.table.settings.loading = false;
        this.table.settings.data = sampleData;
      }, 3000);
    }
  },
  watch: {
    'table.selected': function(val) {
      console.log(val);
    }
  }
}
`

export default data;