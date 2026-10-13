import { useDispatch } from 'react-redux'
import { clearSelection } from '../store/ordersSlice.js'
export default function OrderDetails({ order }) {
  const dispatch = useDispatch()
  if (!order) return null
  return <div className="modal-backdrop" role="presentation" onClick={() => dispatch(clearSelection())}>
    <section className="detail-modal" role="dialog" aria-modal="true" aria-label={`Details for ${order.id}`} onClick={e => e.stopPropagation()}>
      <div className="detail-head"><div><small>ORDER DETAILS</small><h2>{order.id}</h2></div><button onClick={() => dispatch(clearSelection())} aria-label="Close details">×</button></div>
      <span className={`status status-${order.status.toLowerCase().replace(' ','-')}`}>{order.status}</span>
      <div className="detail-grid"><div><small>Customer</small><b>{order.customer}</b></div><div><small>Contact</small><b>{order.email}</b></div><div><small>Order date</small><b>{order.placedAt}</b></div><div><small>Estimated delivery</small><b>{order.eta}</b></div><div><small>Fulfillment location</small><b>{order.location}</b></div><div><small>Order total</small><b>${order.total.toFixed(2)}</b></div></div>
      <div className="progress-label"><span>Fulfillment progress</span><b>{order.progress}%</b></div><div className="progress-track"><span style={{width:`${order.progress}%`}}/></div>
      <button className="primary-button detail-close" onClick={() => dispatch(clearSelection())}>Done</button>
    </section>
  </div>
}
