import reducer, { fetchOrders, selectOrder, clearSelection } from './ordersSlice.js'

test('select and clear selected order', () => {
  const order = { id: 'ORD-1', customer: 'Demo Customer' }
  let state = reducer(undefined, selectOrder(order))
  expect(state.selectedOrder).toEqual(order)
  state = reducer(state, clearSelection())
  expect(state.selectedOrder).toBeNull()
})

test('tracks successful order fetch', () => {
  let state = reducer(undefined, { type: fetchOrders.pending.type })
  expect(state.status).toBe('loading')
  state = reducer(state, { type: fetchOrders.fulfilled.type, payload: [{ id: 'ORD-1' }] })
  expect(state.status).toBe('succeeded')
  expect(state.items).toHaveLength(1)
})
