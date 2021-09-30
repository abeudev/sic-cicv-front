import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import general from './general';
import defaultPages from './default';
import sessions from './sessions';
import userManagement from './userManagement';
import boardingTypeManagement from './boardingTypeManagement';
import roleManagement from './roleManagement';
import logs from './logs';
import samplePages from './samplePages';

import documentations from './documentations';
import uiElements from './uiElements';

/*****new import */

import warehouses from './warehouses';
import transactionManagement from './transactionManagement';
import colisManagement from './colisManagement';
import colisTypeManagement from './colisTypeManagement';
import warehouseManagement from './warehouseManagement';
import colisTrackerManagement from './colisTrackerManagement';
import deliveryManManagement from './deliveryManManagement';
import clientManagement from './clientManagement';
import agentManagement from './agentManagement';
/**
 * Define routes
 */
const routes = [
  ...general,
  ...defaultPages,
  ...sessions,
  ...userManagement,
  ...roleManagement,
  ...logs,
  ...samplePages,
  ...documentations,
  ...uiElements,
  /** new routes */
  ...warehouses,
  ...boardingTypeManagement,
  ...transactionManagement,
  ...colisManagement,
  ...colisTypeManagement,
  ...warehouseManagement,
  ...colisTrackerManagement,
  ...deliveryManManagement,
  ...clientManagement,
  ...agentManagement,
];

Vue.use(Router);

/**
 * Init Router with history mode
 */
const router = new Router({
  mode: 'history',
  routes
});

/**
 * Matching route to user permitted routes
 */
router.beforeEach((to, from, next) => {
  /**
   * Start Loading Page Animation
   */
  NProgress.start();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    /**
     * this route requires auth, check if logged in
     * if not, redirect to login page.
     */
    if (!store.getters['auth/token']) {
      window.localStorage.removeItem('vuex');
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      /**
       * Permission check
       * If route not included, redirect to forbidden
       */
      const role = store.getters['auth/role'];
      const permit = role.permissions.some(menu => {
        return menu.name === to.name || ['index', 'logout', 'forbidden'].includes(to.name);
      })
      if (permit || role.level == -1) {
        next();
      } else {
        next({
          path: '/forbidden',
          query: { redirect: to.fullPath },
        });
      }
    }
  } else if (!to.matched.some((record) => record.meta.requiresAuth)) {
    /**
     * If route doesn't require auth, check the session and
     * redirect to dashboard if session exist
     */
    if (store.getters['auth/token']) {
      next({
        path: '/dashboard',
        query: { redirect: to.fullPath },
      });
    } else {
      window.localStorage.removeItem('vuex');
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

/**
 * Stop Loading Page Animation
 */
router.afterEach((to, from, next) => {
  NProgress.done();
})

/**
 * Create Tree of Routes Options to be injected in Roles and Permission Page
 */
const filteredRoutes = routes.filter(route => route.meta.requiresAuth && !route.meta.default);
/**
 * Create new Array
 * @param {Array} routes 
 * @returns {Array}
 */
const createRouteOptions = routes => {  
  const newJson = [];
  routes.forEach(route => {
    if (route.children) {
      newJson.push({
        title: route.meta.title,
        name: route.name,
        requiresAccess: route.meta.requiresAccess || false,
        children: createRouteOptions(route.children)
      });
    } else {
      newJson.push({
        title: route.meta.title,
        name: route.name,
        requiresAccess: route.meta.requiresAccess || false
      })
    }    
  })
  return newJson;
}
store.dispatch('template/setRoutes', createRouteOptions(filteredRoutes));

export default router;
