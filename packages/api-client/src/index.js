import axios from 'axios'
import { seedOrders } from './mockData.js'

const baseURL = import.meta.env?.VITE_API_BASE_URL || '/api'
export const api = axios.create({ baseURL, timeout: 8000, headers: { Accept: 'application/json' } })

api.interceptors.request.use(config => {
  config.metadata = { startedAt: Date.now() }
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status
    error.userMessage = status ? `Request failed (${status}). Please retry.` : 'Service unavailable. Check your connection.'
    return Promise.reject(error)
  }
)

// Local mock adapter makes the sample portal usable without a backend.
api.defaults.adapter = async config => {
  await new Promise(resolve => setTimeout(resolve, 120))
  const url = config.url || ''
  const params = config.params || {}
  let data
  if (url.includes('/orders/summary')) {
    data = { total: seedOrders.length, processing: seedOrders.filter(o => o.status === 'Processing').length,
      inTransit: seedOrders.filter(o => o.status === 'In transit').length,
      delivered: seedOrders.filter(o => o.status === 'Delivered').length,
      revenue: seedOrders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + o.total, 0) }
  } else if (url.match(/\/orders\/[^/]+$/)) {
    const id = url.split('/').pop()
    data = seedOrders.find(o => o.id === id)
    if (!data) return { data: { message: 'Order not found' }, status: 404, statusText: 'Not Found', headers: {}, config }
  } else {
    const q = String(params.q || '').toLowerCase()
    const status = String(params.status || '').toLowerCase()
    data = seedOrders.filter(o => (!q || `${o.id} ${o.customer} ${o.location}`.toLowerCase().includes(q)) &&
      (!status || o.status.toLowerCase() === status))
  }
  return { data, status: 200, statusText: 'OK', headers: {}, config }
}

export const orderApi = {
  list: params => api.get('/orders', { params }).then(r => r.data),
  summary: () => api.get('/orders/summary').then(r => r.data),
  getById: id => api.get(`/orders/${encodeURIComponent(id)}`).then(r => r.data)
}
