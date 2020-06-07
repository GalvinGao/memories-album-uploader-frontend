import axios from 'axios'

const service = axios.create({
  baseURL: '/api',
  timeout: 90 * 1000 // 1.5 minute
})

export default service
