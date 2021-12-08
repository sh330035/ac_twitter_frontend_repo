import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../api/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      account: '',
      email: '',
      name: '',
      avatar: '',
      cover: '',
      role: ''
    },
    //預設
    isAuthenticated: false,
    token: '',
    isRenderTweetList: false
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    },
    // 監控 navbar tweet Modal
    renderTweetList(state) {
      state.isRenderTweetList = true
    },
    renderTweetListSwitch(state) {
      state.isRenderTweetList = false
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        // 呼叫 usersAPI.getCurrentUser() 方法，並將 response 顯示出來
        const { data } = await usersAPI.getCurrentUser()
        const { id, name, email, account, role, avatar, cover } = data
        commit('setCurrentUser', {
          id,
          name,
          email,
          account,
          role,
          avatar,
          cover
        })
        return true
      } catch (error) {
        console.log('error', error)
        console.error('can not fetch user information')
        return false
      }
    }
  },
  modules: {}
})
