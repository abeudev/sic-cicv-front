const Users = () => import('@/views/clientManagement/Clients');
const UsersTable = () => import('@/views/clientManagement/clients/Table');
const UsersForm = () => import('@/views/clientManagement/clients/Form');

const userManagement = [
  {
    path: '/clients',
    name: 'clients',
    meta: { title: 'User Management', layout: 'admin', requiresAuth: true },
    component: Users,
    redirect: '/clients/table',
    children: [
      {
        path: '/clients/table',
        name: 'clientTable',
        parent: 'clients',
        component: UsersTable,
        props: true,
        meta: {
          title: 'clients Table',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/clients/add',
        name: 'clientAdd',
        parent: 'clients',
        component: UsersForm,
        props: true,
        meta: {
          title: 'Add client',
          type: 'add',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/clients/edit/:id',
        name: 'clientEdit',
        parent: 'clients',
        component: UsersForm,
        props: true,
        meta: {
          title: 'Update client',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
     
    ]
  }
];

export default userManagement;