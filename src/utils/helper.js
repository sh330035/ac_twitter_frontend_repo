import axios from 'axios'

// 向後端確認後再修正
const baseURL = 'http://localhost:3000/api'

export const apiHelper = axios.create({
  baseURL
})

