const Login = () => import('@/views/sessions/Login');
const Register = () => import('@/views/sessions/Register');
const ActivatePage = () => import('@/views/sessions/ActivatePage');
const ForgotPassword = () => import('@/views/sessions/ForgotPassword');
const ResetPassword = () => import('@/views/sessions/ResetPassword');

const sessions = [
  {
    path: '/login',
    name: 'login',
    meta: { title: 'Login', requiresAuth: false, default: true },
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    meta: { title: 'Logout', requiresAuth: true, default: true },
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    meta: { title: 'Register', requiresAuth: false, default: true },
    component: Register
  },
  {
    path: '/activate/:token',
    name: 'activatePage',
    meta: { title: 'Activate User', requiresAuth: false, default: true },
    component: ActivatePage
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    meta: { title: 'Forgot Password', requiresAuth: false, default: true },
    component: ForgotPassword
  },
  {
    path: '/reset-password/:token',
    name: 'resetPassword',
    meta: { title: 'Reset Password', requiresAuth: false, default: true },
    component: ResetPassword
  }
];

export default sessions;