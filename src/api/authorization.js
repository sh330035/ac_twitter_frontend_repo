import { apiHelper } from '../utils/helper'

export default {
  signIn({ account, password }) {
    return apiHelper.post('/signin', { account, password })
  },
  signUp({ account, name, email, password, checkPassword }) {
    return apiHelper.post('/users', {
      account,
      name,
      email,
      password,
      checkPassword
    })
  }
}
