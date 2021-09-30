const Home = () => import('@/views/Home');
const Dashboard = () => import('@/views/dashboard/Dashboard');
const Install = () => import('@/views/Install');
const Profile = () => import('@/views/user/Profile');
const SiteConfigurations = () => import('@/views/settings/SiteConfigurations');

const general = [
  {
    path: '/',
    name: 'index',
    meta: { title: 'Home', layout: 'admin', requiresAuth: true, default: true },
    component: Home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { title: 'Dashboard', layout: 'admin', requiresAuth: true },
    component: Dashboard
  },
  {
    path: '/install',
    name: 'install',
    meta: { title: 'Installation', requiresAuth: false, default: true },
    component: Install
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    meta: { title: 'User Profile', layout: 'admin', requiresAuth: true },
    component: Profile
  },
  {
    path: '/settings/site-configurations',
    name: 'siteConfigurations',
    meta: { title: 'Site Configurations', layout: 'admin', requiresAuth: true, requiresAccess: true },
    component: SiteConfigurations
  }
];

export default general;