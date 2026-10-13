import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { orderApi } from '../../../api-client/src/index.js'

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (params = {}, { rejectWithValue }) => {
  try { return await orderApi.list(params) }
  catch (e) { return rejectWithValue(e.userMessage || e.message || 'Unable to load orders') }
})
export const fetchSummary = createAsyncThunk('orders/fetchSummary', async (_, { rejectWithValue }) => {
  try { return await orderApi.summary() }
  catch (e) { return rejectWithValue(e.userMessage || e.message || 'Unable to load summary') }
})

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { items: [], summary: null, status: 'idle', summaryStatus: 'idle', error: null, selectedOrder: null },
  reducers: {
    selectOrder(state, action) { state.selectedOrder = action.payload },
    clearSelection(state) { state.selectedOrder = null }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.pending, state => { state.status = 'loading'; state.error = null })
      .addCase(fetchOrders.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload })
      .addCase(fetchOrders.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload || action.error.message })
      .addCase(fetchSummary.pending, state => { state.summaryStatus = 'loading' })
      .addCase(fetchSummary.fulfilled, (state, action) => { state.summaryStatus = 'succeeded'; state.summary = action.payload })
      .addCase(fetchSummary.rejected, state => { state.summaryStatus = 'failed' })
  }
})
export const { selectOrder, clearSelection } = ordersSlice.actions
export default ordersSlice.reducer
