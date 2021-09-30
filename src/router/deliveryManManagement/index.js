const Users = () => import('@/views/deliveryManManagement/DeliveryMans');
const UsersTable = () => import('@/views/deliveryManManagement/deliveryMans/Table');
const UsersForm = () => import('@/views/deliveryManManagement/deliveryMans/Form');

const userManagement = [
  {
    path: '/deliverymans',
    name: 'deliverymans',
    meta: { title: 'User Management', layout: 'admin', requiresAuth: true },
    component: Users,
    redirect: '/deliverymans/table',
    children: [
      {
        path: '/deliverymans/table',
        name: 'deliveryManTable',
        parent: 'deliverymans',
        component: UsersTable,
        props: true,
        meta: {
          title: 'deliverymans Table',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/deliverymans/add',
        name: 'deliveryManAdd',
        parent: 'deliverymans',
        component: UsersForm,
        props: true,
        meta: {
          title: 'Add deliveryMan',
          type: 'add',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/deliverymans/edit/:id',
        name: 'deliveryManEdit',
        parent: 'deliverymans',
        component: UsersForm,
        props: true,
        meta: {
          title: 'Update deliveryMan',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
     
    ]
  }
];

export default userManagement;