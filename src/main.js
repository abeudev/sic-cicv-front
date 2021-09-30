import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
import moment from 'moment-timezone';
import Vuebar from 'vuebar';
import Loading from 'vue-loading-overlay';
import VueCroppie from 'vue-croppie';

/**
 * Import Mixins
 */
import errorAdapter from './components/helpers/mixins/errorAdapter';
import roleCheck from './components/helpers/mixins/roleCheck';
import mixinUtils from './components/helpers/mixins/mixinUtils';

/**
 * Import CSS
 */
import 'vue-loading-overlay/dist/vue-loading.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vue2-animate/dist/vue2-animate.min.css';
import 'croppie/croppie.css';
import 'prismjs/themes/prism.css';

/**
 * Import Plugins
 */
import './plugins/vuetify';
import './plugins/snotify';
import './plugins/vueGoogleMaps';
import 'prismjs';

/**
 * Import Custom Templates
 */
import Admin from './layouts/Admin.vue';
import Fullscreen from './layouts/Fullscreen.vue';
import GAvatar from './components/helpers/GAvatar.vue';
import vLoading from './components/helpers/directives/vLoading';
import Breadcrumbs from './components/helpers/Breadcrumbs';
import './views/uiElements/register';

/**
 * Custom Components
 * Init here so it can be accessed trough all components
 */
Vue.component('admin-layout', Admin);
Vue.component('fullscreen-layout', Fullscreen);
Vue.component('g-avatar', GAvatar);
Vue.component('g-breadcrumbs', Breadcrumbs);

/**
 * Custom Directives
 */
Vue.directive('loading', vLoading);

/**
 * Custom Mixins
 */
Vue.mixin(errorAdapter);
Vue.mixin(roleCheck);
Vue.mixin(mixinUtils);

Vue.use(VueAxios, Axios);
Vue.use(VueLodash, { lodash });
Vue.use(Vuebar);
Vue.use(Loading, { color: '#26329D' });
Vue.use(VueCroppie);

Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
