const getDefaultState = () => {
  return {
    contact: null,
    general: null,
    timeAndRegion: null,
    session: null
  }
}
// initial state
const state = getDefaultState();

const getters = {
  /**
   * Get Contact, General info, Time Region, Session
   * @param {Object} state 
   * @returns {Object}
   */
  contact (state) {
    return state.contact;
  },
  general (state) {
    return state.general;
  },
  timeAndRegion (state) {
    return state.timeAndRegion;
  },
  session (state) {
    return state.session;
  }
}

const mutations = {
  /**
   * Set Config data
   * @param {Object} state 
   * @param {Object} config 
   */
  SET_CONFIG (state, config) {
    state.contact = config.contact;
    state.general = config.general;
    state.timeAndRegion = config.timeAndRegion;
    state.session = config.session;
  },
  /**
   * Reset State
   * @param {Object} state 
   */
  RESET_STATE (state) {
    Object.assign(state, getDefaultState())
  }
}

const actions = {
  setConfig ({ commit }, config) {
    commit('SET_CONFIG', config)
  },
  resetState ({ commit }) {
    commit('RESET_STATE')
  }
}

export const config = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
