import { apiHelper } from '../utils/helper'

export default {
  signIn({ email, password }) {
    return apiHelper.post('/signin', { email, password })
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
