const Roles = () => import('@/views/roles/Roles');
const RolesTable = () => import('@/views/roles/roles/Table');
const RolesForm = () => import('@/views/roles/roles/Form');

const roleManagement = [
  {
    path: '/roles',
    name: 'roles',
    meta: { title: 'Roles and Permissions', layout: 'admin', requiresAuth: true },
    component: Roles,
    redirect: '/roles/table',
    children: [
      {
        path: '/roles/table',
        name: 'rolesTable',
        parent: 'users',
        component: RolesTable,
        props: true,
        meta: {
          title: 'Roles Table',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/roles/add',
        name: 'rolesAdd',
        parent: 'users',
        component: RolesForm,
        props: true,
        meta: {
          title: 'Add Role',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/roles/edit/:id',
        name: 'rolesEdit',
        parent: 'users',
        component: RolesForm,
        props: true,
        meta: {
          title: 'Update Role',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      }
    ]
  }
];

export default roleManagement;