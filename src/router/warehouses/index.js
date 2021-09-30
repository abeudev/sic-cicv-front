const Warehouses = () => import('@/views/warehouses/Warehouses');
const WarehousesTable = () => import('@/views/warehouses/Table');
const WarehousesForm = () => import('@/views/warehouses/Form');

const warehouses = [
  {
    path: '/warehouses',
    name: 'warehouses',
    meta: { title: 'Warehouses', layout: 'admin', requiresAuth: true },
    component: Warehouses,
    redirect: '/warehouses/table',
    children: [
      {
        path: '/warehouses/table',
        name: 'warehousesTable',
        parent: 'warehouses',
        component: WarehousesTable,
        props: true,
        meta: {
          title: 'warehouses Table',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/warehouses/add',
        name: 'warehousesAdd',
        parent: 'warehouses',
        component: WarehousesForm,
        props: true,
        meta: {
          title: 'Add Warehouse',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/warehouses/edit/:id',
        name: 'warehousesEdit',
        parent: 'warehouses',
        component: WarehousesForm,
        props: true,
        meta: {
          title: 'Update Warehouse',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      }
    ]
  }
];

export default warehouses;