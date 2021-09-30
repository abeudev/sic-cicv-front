<template>
  <v-container grid-list-lg pl-0 pr-0>
    <v-layout row wrap>
      <v-flex xs12>
        <h3 class="primary--text">Users Management</h3>
        <p>
          A User is determined in these field
          <ul>
            <li>
              <i class="red--text">isActive</i> = <i class="primary--text">True</i> ==> Active users
            </li>
            <li>
              <i class="red--text">isActive</i> = <i class="primary--text">False</i> ==> InActive users
            </li>
            <li>
              <i class="red--text">isPending</i> = <i class="primary--text">True</i> and 
              <i class="red--text">isActive</i> = <i class="primary--text">False</i> ==> 
              Pending users. <br> 
              Users who has registered but still doesn't click activate from email. Can be activated in <i class="primary--text">Pending Users</i> Tab.
            </li>
          </ul>
        </p>

        <h3 class="primary--text">Roles Management</h3>
        <p>
          <ul>
            <li>A Role has a <i class="primary--text">Level</i> and <i class="primary--text">Type</i>.</li>
            <li>Level -1 is superAdmin, 0 is user.</li>
            <li>And a Role has some Permissions. And will be checked in router.</li>
            <li>Permissions has an <code>access</code> field. The <code>access</code> field is used to manipulate components in a page whether it is accessible or not.</li>
          </ul>
          <prism-editor :code="permissionExample" language="js" readonly/>
        </p>
        <br>
        <h3 class="primary--text">Route Example</h3>
        <p>
          This will be generated as selection options in <i class="primary--text">Roles Management Tree</i>. Please add <code>meta.requiresAccess</code> to enable access selection in <i class="primary--text">Roles Management Tree</i>
          <prism-editor :code="routeExample" language="js" readonly/>
        </p>
        <br>
        <h3 class="primary--text">Site Configurations</h3>
        <p>
          <ul>
            <li><i class="red--text">dateFormat</i> ==> To set format in DatePicker component.</li>
            <li><i class="red--text">timeFormat</i> ==> To set format in TimePicker component.</li>
            <li>
              <i class="red--text">timezone</i> ==> To set format somewhere in page by calling timeZone mixin like this <br>
              <prism-editor :code="timeZoneExpample" language="js" readonly/>
            </li>
            <li>Default session (<i class="red--text">value</i> and <i class="red--text">unit</i>) ==> Used to set the expiration of JWT in backend.</li>
            <li><i class="red--text">defaultRoleID</i> ==> Used to apply default role for registered user or can be used as temporary role of a user before deleting certain role.</li>
          </ul>
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PrismEditor from 'vue-prism-editor';
import Libraries from './Libraries';
export default {
  components: {
    PrismEditor
  },
  data() {
    return {
      permissionExample: `{
    "name": "God Mode",
    "permissions": [
        {
            "access": "read",
            "_id": "5ee431dfc93ae60ab2690268",
            "title": "Dashboard",
            "name": "dashboard"
        }
    ],
    "level": -1,
    "type": "superAdmin",
    "isActive": true
}`,
    routeExample: `{
    path: '/users/table',
    name: 'usersTable',
    parent: 'users',
    component: UsersTable,
    props: true,
    meta: {
        title: 'Users Table',
        layout: 'admin',
        requiresAuth: true,
        requiresAccess: true
    }
},
    `,
    timeZoneExpample: `this.timeZone(momentData, 'DD MMM YYYY H:mm z');`
    }
  }
}
</script>