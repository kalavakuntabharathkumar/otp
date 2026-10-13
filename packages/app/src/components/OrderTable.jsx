import { useDispatch } from 'react-redux'
import { selectOrder } from '../store/ordersSlice.js'

export default function OrderTable({ orders }) {
  const dispatch = useDispatch()
  if (!orders.length) return <div className="empty">No orders found. Try another search or status.</div>
  return <div className="table-scroll"><table><thead><tr><th>Order ID</th><th>Customer</th><th>Order date</th><th>Items</th><th>Total</th><th>Status</th><th>ETA</th><th/></tr></thead>
    <tbody>{orders.map(o => <tr key={o.id} onClick={() => dispatch(selectOrder(o))} className="order-row">
      <td><b className="order-id">{o.id}</b><small>Standard delivery</small></td><td><b>{o.customer}</b><small>{o.location}</small></td><td>{o.placedAt}</td><td>{o.items}</td><td className="money">${o.total.toLocaleString('en-US',{minimumFractionDigits:2})}</td>
      <td><span className={`status status-${o.status.toLowerCase().replace(' ','-')}`}>{o.status}</span></td><td>{o.eta}</td><td><button className="row-action" aria-label={`View ${o.id}`}>→</button></td>
    </tr>)}</tbody></table></div>
}
