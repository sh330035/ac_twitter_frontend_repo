import { apiHelper } from '../utils/helper'

export default {
  signIn({ account, password }) {
    return apiHelper.post('/signin', { account, password })
  },
  signUp({ account, email, password, checkPassword }) {
    return apiHelper.post('/users', {
      account,
      email,
      password,
      checkPassword
    })
  }
}
