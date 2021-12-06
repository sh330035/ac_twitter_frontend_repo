import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //dummy data current user
    currentUser: {
      id: 1,
      account: 'user1',
      email: 'user1@example.com',
      name: 'user1',
      password: '$2a$10$jf.dLx/ohvbTS1y0yrelo.h0IBnw9baWWXM7jEYUkE2iGnRo1ngLa',
      avatar: 'https://randomuser.me/api/portraits/women/82.jpg',
      cover: 'https://loremflickr.com/320/240/city/?random=87.0724194526249',
      introduction:
        'In velit doloribus delectus est eum quia aut perferendis eveniet. Quas sint asperiores dolorem. Numquam et ipsa. Dolorum consequuntur quae quidem et at quia reiciendis molestiae voluptatem. Eligendi ex quis cupiditate natus sequi ratione illo repellendus omnis. Magni praesentium consequuntur sed qui atque corrupti ratione ut.',
      role: 'user',
      createdAt: '2021-11-30T10:01:31.000Z',
      updatedAt: '2021-11-30T10:01:31.000Z'
    },
    //預設
    isAuthenticated: true,
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM4NzgwODc2fQ.s4KEjXcuakXnuuLDozqZFzToNw1rsONt-3XLSBKOo3I'
  },
  mutations: {
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {},
  modules: {}
})
