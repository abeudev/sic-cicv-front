const NotFound = () => import('@/views/default/NotFound');

const defaultPages = [
  { 
    path: "*", 
    meta: { title: 'Not Found', layout: 'admin', requiresAuth: true, default: true },
    component: NotFound
  },
  { 
    path: "/forbidden",
    name: "forbidden",
    meta: { layout: 'admin', requiresAuth: true, default: true },
    component: NotFound
  },
];

export default defaultPages;