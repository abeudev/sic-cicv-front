const Feeds = () => import('@/views/samplePages/feeds/Feeds');
const FeedsTable = () => import('@/views/samplePages/feeds/Table');
const FeedsForm = () => import('@/views/samplePages/feeds/Form');

const feeds = [
  {
    path: '/feeds',
    name: 'feeds',
    meta: { title: 'Feeds', layout: 'admin', requiresAuth: true },
    component: Feeds,
    redirect: '/feeds/table',
    children: [
      {
        path: '/feeds/table',
        name: 'feedsTable',
        parent: 'feeds',
        component: FeedsTable,
        props: true,
        meta: {
          title: 'Feeds Table',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/feeds/add',
        name: 'feedsAdd',
        parent: 'feeds',
        component: FeedsForm,
        props: true,
        meta: {
          title: 'Add Feed',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      },
      {
        path: '/feeds/edit/:id',
        name: 'feedsEdit',
        parent: 'feeds',
        component: FeedsForm,
        props: true,
        meta: {
          title: 'Update Feed',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      }
    ]
  }
];

export default feeds;