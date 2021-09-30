const Users = () => import('@/views/userManagement/Users');
const UsersTable = () => import('@/views/userManagement/users/Table');
const UsersForm = () => import('@/views/userManagement/users/Form');
const PendingUsersTable = () => import('@/views/userManagement/pendingUsers/Table');

const userManagement = [
  {
    path: '/users',
    name: 'users',
    meta: { title: 'User Management', layout: 'admin', requiresAuth: true },
    component: Users,
    redirect: '/users/table',
    children: [
      {
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
      {
        path: '/users/add',
        name: 'usersAdd',
        parent: 'users',
        component: UsersForm,
        props: true,
        meta: {
          title: 'Add User',
          type: 'add',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/users/edit/:id',
        name: 'usersEdit',
        parent: 'users',
        component: UsersForm,
        props: true,
        meta: {
          title: 'Update User',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/users/pending',
        name: 'usersPending',
        parent: 'users',
        component: PendingUsersTable,
        props: true,
        meta: {
          title: 'Pending Users',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      }
    ]
  }
];

export default userManagement;