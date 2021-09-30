const getDefaultState = () => {
  return {
    drawer: true,
    drawerRight: false,
    clipped: false,
    miniVariant: false,
    floatDrawer: false,
    routes: []
  }
}
// initial state
const state = getDefaultState();

const getters = {
  /**
   * Get drawer, drawerRight, clipped, miniVariant, floatDrawer state
   * @param {Object} state
   * @returns {Boolean}
   */
  drawer (state) {
    return state.drawer
  },
  drawerRight (state) {
    return state.drawerRight
  },
  clipped (state) {
    return state.clipped
  },
  miniVariant (state) {
    return state.miniVariant
  },
  floatDrawer (state) {
    return state.floatDrawer
  },
  /**
   * Get user routes
   * @param {Object} state
   * @returns {Array} 
   */
  routes (state) {
    return state.routes
  }
}

const mutations = {
  SET_DRAWER (state, drawer) {
    state.drawer = drawer
  },
  SET_DRAWER_RIGHT (state, drawerRight) {
    state.drawerRight = drawerRight
  },
  SET_CLIPPED (state, clipped) {
    state.clipped = clipped
  },
  SET_MINI_VARIANT (state, miniVariant) {
    state.miniVariant = miniVariant
  },
  SET_FLOAT_DRAWER (state, floatDrawer) {
    state.floatDrawer = floatDrawer
  },
  SET_ROUTES (state, routes) {
    state.routes = routes
  },
  RESET_STATE (state) {
    Object.assign(state, getDefaultState())
  }
}

/**
 * Create Actions Helper
 */
const actions = {
  setDrawer ({ commit }, drawer) {
    commit('SET_DRAWER', drawer)
  },
  setDrawerRight ({ commit }, drawerRight) {
    commit('SET_DRAWER_RIGHT', drawerRight)
  },
  setClipped ({ commit }, clipped) {
    commit('SET_CLIPPED', clipped)
  },
  setMiniVariant ({ commit }, miniVariant) {
    commit('SET_MINI_VARIANT', miniVariant)
  },
  setFloatDrawer ({ commit }, floatDrawer) {
    commit('SET_FLOAT_DRAWER', floatDrawer)
  },
  setRoutes ({ commit }, routes) {
    commit('SET_ROUTES', routes)
  },
  resetState ({ commit }) {
    commit('RESET_STATE')
  }
}

export const template = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
