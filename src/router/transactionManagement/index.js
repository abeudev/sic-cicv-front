const PrincipalComponent = () => import('@/views/transactionManagement/Transactions');
const Table = () => import('@/views/transactionManagement/transactions/Table');
const Form = () => import('@/views/transactionManagement/transactions/Form');

const transactionManagement = [
  {
    path: '/transaction',
    name: 'transaction',
    meta: { title: 'Transactions management', layout: 'admin', requiresAuth: true },
    component: PrincipalComponent,
    redirect: '/transaction/table',
    children: [
      {
        path: '/transaction/table',
        name: 'transactionsTable',
        parent: 'transaction',
        component: Table,
        props: true,
        meta: {
          title: 'Liste des Envois',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/transaction/add',
        name: 'transactionsAdd',
        parent: 'transaction',
        component: Form,
        props: true,
        meta: {
          title: 'Ajouter un Envoi',
          type: 'add',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/transaction/edit/:id',
        name: 'transactionsEdit',
        parent: 'transaction',
        component: Form,
        props: true,
        meta: {
          title: 'Mise à jour',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
    ]
  }
];

export default transactionManagement;