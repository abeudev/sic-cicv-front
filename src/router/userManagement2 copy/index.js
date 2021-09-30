const Users = () => import('@/views/userManagement2/Users');
const UsersTable = () => import('@/views/userManagement2/users/Table');
const UsersForm = () => import('@/views/userManagement2/users/Form');
const PendingUsersTable = () => import('@/views/userManagement2/pendingUsers/Table');

const userManagement2 = [
  {
    path: '/users2',
    name: 'users2',
    meta: { title: 'User Management 2', layout: 'admin', requiresAuth: true },
    component: Users,
    redirect: '/users2/table',
    children: [
      {
        path: '/users2/table',
        name: 'usersTable2',
        parent: 'users2',
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
        path: '/users2/add',
        name: 'usersAdd2',
        parent: 'users2',
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
        path: '/users2/edit/:id',
        name: 'usersEdit2',
        parent: 'users2',
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
        path: '/users2/pending',
        name: 'usersPending2',
        parent: 'users2',
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

export default userManagement2;