const PrincipalComponent = () => import('@/views/warehouseManagement/Warehouses');
const Table = () => import('@/views/warehouseManagement/warehouses/Table');
const Form = () => import('@/views/warehouseManagement/warehouses/Form');
const PendingTable = () => import('@/views/warehouseManagement/pendingWarehouses/Table');

const warehouseManagement = [
  {
    path: '/warehouse',
    name: 'warehouse',
    meta: { title: 'warehouse management', layout: 'admin', requiresAuth: true },
    component: PrincipalComponent,
    redirect: '/warehouse/table',
    children: [
      {
        path: '/warehouse/table',
        name: 'warehouseTable',
        parent: 'warehouse',
        component: Table,
        props: true,
        meta: {
          title: 'Liste des warehouse',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/warehouse/add',
        name: 'warehouseAdd',
        parent: 'warehouse',
        component: Form,
        props: true,
        meta: {
          title: 'Ajouter un warehouse',
          type: 'add',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/warehouse/edit/:id',
        name: 'warehouseEdit',
        parent: 'warehouse',
        component: Form,
        props: true,
        meta: {
          title: 'Mise à jour',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/warehouse/pending',
        name: 'warehousePending',
        parent: 'warehouse',
        component: PendingTable,
        props: true,
        meta: {
          title: 'En attente',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      }
    ]
  }
];

export default warehouseManagement;