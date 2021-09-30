const PrincipalComponent = () => import('@/views/colisManagement/Colis');
const Table = () => import('@/views/colisManagement/colis/Table');
const Form = () => import('@/views/colisManagement/colis/Form');
const PendingTable = () => import('@/views/colisManagement/pendingColis/Table');
const CompletedTable = ()=>import('@/views/colisManagement/completedColis/Table');

const colisManagement = [
  {
    path: '/colis',
    name: 'colis',
    meta: { title: 'Colis management', layout: 'admin', requiresAuth: true },
    component: PrincipalComponent,
    redirect: '/colis/table',
    children: [
      {
        path: '/colis/table',
        name: 'colisTable',
        parent: 'colis',
        component: Table,
        props: true,
        meta: {
          title: 'Liste des Colis',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/colis/add',
        name: 'colisAdd',
        parent: 'colis',
        component: Form,
        props: true,
        meta: {
          title: 'Ajouter un colis',
          type: 'add',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/colis/edit/:id',
        name: 'colisEdit',
        parent: 'colis',
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
        path: '/colis/pending',
        name: 'colisPending',
        parent: 'colis',
        component: PendingTable,
        props: true,
        meta: {
          title: 'En attente',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/colis/completed',
        name: 'colisCompleted',
        parent: 'colis',
        component: CompletedTable,
        props: true,
        meta: {
          title: 'Terminé',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      }
    ]
  }
];

export default colisManagement;