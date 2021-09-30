<template>
  <DataTable :table="table" />
</template>

<script>
import DataTable from "../../../components/helpers/DataTable";

export default {
  components: { DataTable },
  data() {
    return {
      table: {
        title: 'Account Logs Table',
        toolbar: {
          search: true,
          exportButtons: true,
          daterange: {
            display: true,
            fieldName: 'createdAt'
          },
          filters: [
            {
              type: 'input',
              fieldName: 'username',
              label: 'Username',
              value: ''
            },
            {
              type: 'input',
              fieldName: 'ip',
              label: 'IP Address',
              value: ''
            },
            {
              type: 'input',
              fieldName: 'comment',
              label: 'Descriptions',
              value: ''
            }
          ]
        },
        settings: {
          url: "logs/users/table",
          isServerSide: true,
          pagination: {
            sortBy: 'createdAt',
            descending: true,
            rowsPerPage: 25
          }
        },
        headers: [
          { text: "Username"},
          { text: "IP Address" },
          { text: "Description" },
          { text: "Created At" }
        ],
        contents: [
          { data: "username" },
          { 
            data: "ip",
            render: data => {
              if (data == '::1') return '-';
              if (data && data.indexOf('::ffff:') > -1) {
                let parsed = data.substring(7);
                return parsed;
              }
            }
          },
          { data: "comment" },
          {
            data: "createdAt",
            render: data => {
              return this.timeZone(data);
            }
          }
        ],
        actions: [
          {
            text: "View Data",
            icon: "remove_red_eye",
            color: "orange",
            getRecord: data => {
              alert(JSON.stringify(data, null, '  '));
            }
          }
        ]
      }
    };
  }
};
</script>