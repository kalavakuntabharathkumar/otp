import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders, fetchSummary } from './store/ordersSlice.js'
import OrderTable from './components/OrderTable.jsx'
import OrderDetails from './components/OrderDetails.jsx'

const statuses = ['All statuses','Processing','In transit','Delivered','Delayed','Cancelled']
export default function App() {
  const dispatch = useDispatch()
  const { items, summary, status, error, selectedOrder } = useSelector(s => s.orders)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All statuses')
  useEffect(() => { dispatch(fetchOrders({})); dispatch(fetchSummary()) }, [dispatch])
  useEffect(() => {
    const timer = setTimeout(() => dispatch(fetchOrders({q:query, status:filter==='All statuses'?'':filter})), 180)
    return () => clearTimeout(timer)
  }, [query, filter, dispatch])

  return <div className="app-shell"><aside className="sidebar"><div className="brand"><span className="brand-icon">↗</span><span>trackline</span></div><div className="workspace"><span className="workspace-icon">TL</span><span><b>Trackline Logistics</b><small>Operations workspace</small></span><span className="caret">⌄</span></div>
    <p className="nav-label">MAIN MENU</p><nav><a className="nav-item" href="#" onClick={e=>e.preventDefault()}><span>▦</span>Overview</a><a className="nav-item active" href="#" onClick={e=>e.preventDefault()}><span>▤</span>Orders <b className="nav-badge">{summary?.total ?? '—'}</b></a><a className="nav-item" href="#" onClick={e=>e.preventDefault()}><span>♧</span>Shipments</a><a className="nav-item" href="#" onClick={e=>e.preventDefault()}><span>♙</span>Customers</a><a className="nav-item" href="#" onClick={e=>e.preventDefault()}><span>▥</span>Analytics</a></nav>
    <div className="sidebar-bottom"><div className="help-box"><span>✦</span><b>Need help?</b><p>Our support team is here to help with your workflow.</p><button>Contact support →</button></div><div className="account"><span className="account-avatar">JD</span><span><b>Jordan Davis</b><small>Operations manager</small></span><span className="caret">•••</span></div></div>
  </aside><main className="main"><header className="topbar"><div className="crumb">Workspace <span>/</span> <b>Orders</b></div><div className="topbar-right"><span className="sync"><i/> All systems operational</span><button className="bell" aria-label="Notifications">♧<i/></button><span className="account-avatar">JD</span></div></header>
    <div className="content"><section className="title-row"><div><p className="eyebrow">OPERATIONS / ORDER MANAGEMENT</p><h1>Order tracking</h1><p className="subtitle">Monitor, search, and manage all customer orders in one place.</p></div><button className="export-button" onClick={()=>{const csv=['Order ID,Customer,Date,Status,Total',...items.map(o=>[o.id,`"${o.customer}"`,o.placedAt,o.status,o.total].join(','))].join('\\n');const blob=new Blob([csv],{type:'text/csv'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='orders.csv';a.click();URL.revokeObjectURL(url)}}><span>↓</span> Export CSV</button></section>
      <section className="metric-grid"><article className="metric"><span className="metric-icon indigo">▤</span><p>Total orders</p><strong>{summary?.total ?? '—'}</strong><small>Across all order statuses</small></article><article className="metric"><span className="metric-icon amber">◷</span><p>Processing</p><strong>{summary?.processing ?? '—'}</strong><small>Being prepared now</small></article><article className="metric"><span className="metric-icon blue">↗</span><p>In transit</p><strong>{summary?.inTransit ?? '—'}</strong><small>On the way to customers</small></article><article className="metric"><span className="metric-icon green">✓</span><p>Delivered</p><strong>{summary?.delivered ?? '—'}</strong><small>Successfully completed</small></article></section>
      <section className="orders-panel"><div className="panel-head"><div><h2>All orders <span>{items.length}</span></h2><p>Click any order to view its fulfillment details.</p></div><button className="refresh" onClick={()=>{dispatch(fetchOrders({q:query,status:filter==='All statuses'?'':filter}));dispatch(fetchSummary())}}>↻ Refresh</button></div>
        <div className="filters"><label className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search order ID, customer, location..." aria-label="Search orders"/></label><label className="filter-select"><span>Status:</span><select value={filter} onChange={e=>setFilter(e.target.value)}>{statuses.map(s=><option key={s}>{s}</option>)}</select></label></div>
        {status==='failed'&&<div className="error">{error||'Could not load orders.'} <button onClick={()=>dispatch(fetchOrders({q:query,status:filter==='All statuses'?'':filter}))}>Retry</button></div>}
        {status==='loading'&&items.length===0?<div className="empty">Loading orders…</div>:<OrderTable orders={items}/>}
        <div className="table-footer"><span>Showing <b>{items.length}</b> sample orders</span><span>Demo data · Updates are simulated</span></div>
      </section><footer className="footer">© 2026 Trackline Logistics <span>Order operations made clearer.</span></footer>
    </div></main><OrderDetails order={selectedOrder}/></div>
}
