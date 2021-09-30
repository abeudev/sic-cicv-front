const Users = () => import('@/views/agentManagement/Agents');
const UsersTable = () => import('@/views/agentManagement/agents/Table');
const UsersForm = () => import('@/views/agentManagement/agents/Form');

const userManagement = [
  {
    path: '/agents',
    name: 'agents',
    meta: { title: 'User Management', layout: 'admin', requiresAuth: true },
    component: Users,
    redirect: '/agents/table',
    children: [
      {
        path: '/agents/table',
        name: 'agentTable',
        parent: 'agents',
        component: UsersTable,
        props: true,
        meta: {
          title: 'agents Table',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/agents/add',
        name: 'agentAdd',
        parent: 'agents',
        component: UsersForm,
        props: true,
        meta: {
          title: 'Add agent',
          type: 'add',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/agents/edit/:id',
        name: 'agentEdit',
        parent: 'agents',
        component: UsersForm,
        props: true,
        meta: {
          title: 'Update agent',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
     
    ]
  }
];

export default userManagement;