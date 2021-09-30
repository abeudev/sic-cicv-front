const getDefaultState = () => {
  return {
    profile: null
  }
}
// initial state
const state = getDefaultState();

const getters = {
  /**
   * Get User Profile
   * @param {Object} state
   * @returns {Object}
   */
  profile (state) {
    return state.profile
  }
}

const mutations = {
  /**
   * Set data
   * @param {Object} state
   * @param {Object} profile
   */
  SET_PROFILE (state, profile) {
    state.profile = profile;
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
  setProfile ({ commit }, profile) {
    commit('SET_PROFILE', profile)
  },
  resetState ({ commit }) {
    commit('RESET_STATE')
  }
}

export const user = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
