const Assets = () => import('@/views/samplePages/fileAssets/Assets');
const FileAssetsTable = () => import('@/views/samplePages/fileAssets/Table');

const assets = [
  {
    path: '/assets',
    name: 'assets',
    meta: { title: 'Assets', layout: 'admin', requiresAuth: true },
    component: Assets,
    redirect: '/assets/table',
    children: [
      {
        path: '/assets/table',
        name: 'assetsTable',
        parent: 'assets',
        component: FileAssetsTable,
        props: true,
        meta: {
          title: 'Assets Table',
          layout: 'admin',
          requiresAuth: true,
          requiresAccess: true
        }
      }
    ]
  }
];

export default assets;