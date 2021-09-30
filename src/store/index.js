import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from "secure-ls";
import { auth } from './modules/auth'
import { user } from './modules/user'
import { template } from './modules/template'
import { config } from './modules/config'

/**
 * Securing local storage
 */
const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user,
    template,
    config
  },
  plugins: [
    /**
     * Create persisted state default to local storage
     */
    createPersistedState({
      key: 'metadata',
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    })
  ]
})
