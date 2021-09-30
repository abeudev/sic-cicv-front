const Logs = () => import('@/views/logs/Logs');
const AccountLogs = () => import('@/views/logs/account/Table');

const logs = [
  {
    path: '/logs',
    name: 'logs',
    meta: { title: 'Logs', layout: 'admin', requiresAuth: true },
    component: Logs,
    redirect: '/logs/account',
    children: [
      {
        path: '/logs/account',
        name: 'accountLogs',
        parent: 'logs',
        meta: { title: 'Account Logs', layout: 'admin', requiresAuth: true },
        component: AccountLogs
      }
    ]
  }
];

export default logs;