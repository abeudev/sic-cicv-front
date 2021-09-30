import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import '@mdi/font/css/materialdesignicons.css';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.use(Vuetify, {
  /**
   * If you want to use Font Awesome, just change the iconfont to 'fa'.
   * Then use it like this <v-icon>fa-home</v-icon>
   */
  iconfont: 'mdi',
  theme: {
    primary: '#26329D',
    secondary: '#ef765f',
    danger: '#ff4444',
    warning: '#ffbb33',
    success: '#00c851',
    info: '#33b5e5'
  }
})
