import { configureStore } from '@reduxjs/toolkit'
import ordersReducer from './ordersSlice.js'
export const store = configureStore({ reducer: { orders: ordersReducer } })
