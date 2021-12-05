import { apiHelper } from '../utils/helper'

export default {
  signIn({ email, password }) {
    return apiHelper.post('/signin', { email, password })
  }
}
