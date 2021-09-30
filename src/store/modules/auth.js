import axios from 'axios';

const getDefaultState = () => {
  return {
    token: null,
    isExpired: true,
    role: {}
  }
}
// initial state
const state = getDefaultState();

const getters = {
  token (state) {
    return state.token;
  },
  isExpired (state) {
    return state.isExpired;
  },
  role (state) {
    return state.role;
  }
}

const mutations = {
  /**
   * Set auth data
   * @param {Object} state 
   * @param {Object} auth 
   */
  SET_AUTH (state, auth) {
    state.token = auth.token;
    state.isExpired = false;
  },
  /**
   * Set whether token is expired or not
   * @param {Object} state 
   * @param {Boolean} isExpired 
   */
  SET_TOKEN_EXPIRED (state, isExpired) {
    state.isExpired = isExpired;
  },
  /**
   * Set role data
   * @param {Object} state 
   * @param {Object} role 
   */
  SET_ROLE (state, role) {
    state.role = role
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
  setAuth ({ commit }, auth) {
    commit('SET_AUTH', auth)
  },
  setTokenExpired ({ commit }, isExpired) {
    commit('SET_TOKEN_EXPIRED', isExpired)
  },
  setRole ({ commit }, role) {
    commit('SET_ROLE', role)
  },
  resetState ({ commit }) {
    commit('RESET_STATE')
  }
}

export const auth = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
