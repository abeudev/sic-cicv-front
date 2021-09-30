const PrincipalComponent = () => import('@/views/colisTrackerManagement/ColisTracker');
const Table = () => import('@/views/colisTrackerManagement/colisTracker/Table');
const Form = () => import('@/views/colisTrackerManagement/colisTracker/Form');
const PendingTable = () => import('@/views/colisTrackerManagement/pendingColisTracker/Table');

const colisTrackerManagement = [
  {
    path: '/colistracker',
    name: 'colisTracker',
    meta: { title: 'ColisTracker management', layout: 'admin', requiresAuth: true },
    component: PrincipalComponent,
    redirect: '/colistracker/table',
    children: [
      {
        path: '/colistracker/table',
        name: 'colisTrackerTable',
        parent: 'colisTracker',
        component: Table,
        props: true,
        meta: {
          title: 'Liste des ColisTracker',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/colistracker/add',
        name: 'colisTrackerAdd',
        parent: 'colisTracker',
        component: Form,
        props: true,
        meta: {
          title: 'Ajouter un colisTracker',
          type: 'add',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/colistracker/edit/:id',
        name: 'colisTrackerEdit',
        parent: 'colisTracker',
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
        path: '/colistracker/pending',
        name: 'colisTrackerPending',
        parent: 'colisTracker',
        component: PendingTable,
        props: true,
        meta: {
          title: 'Validé',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      }
    ]
  }
];

export default colisTrackerManagement;