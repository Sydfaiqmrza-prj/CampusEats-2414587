import { useMyOrders } from '../hooks/useMyOrders.js'
import OrderStatus from '../components/OrderStatus.jsx'
import OrderActions from '../components/OrderActions.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

export default function OrdersPage() {
  const { orders, loading, error } = useMyOrders()

  if (loading) return <Loading />
  if (error) {
    return <ErrorMessage message={error} onRetry={() => window.location.reload()} />
  }
  if (orders.length === 0) {
    return <p className="muted">No orders yet.</p>
  }

  return (
    <section>
      <h2 className="section-title">My orders</h2>
      <p className="muted" style={{ marginBottom: '1rem' }}>
        Status updates appear here live.
      </p>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="card">
            <p className="cart-name">
              {order.vendorName} &middot; pickup {order.pickupTime}
            </p>
            <ul className="orders-items">
              {order.items.map((item, idx) => (
                <li key={item.itemId ?? idx}>
                  {item.qty}&times; {item.name}
                  {item.note && <span className="order-note">Note: {item.note}</span>}
                </li>
              ))}
            </ul>
            <p className="muted">
              Placed{' '}
              {order.createdAt
                ? order.createdAt.toDate().toLocaleString('en-MY')
                : 'just now'}
            </p>
            <p className="price">RM {order.total.toFixed(2)}</p>
            <OrderStatus status={order.status} />
            {order.status === 'Received' && <OrderActions order={order} />}
          </li>
        ))}
      </ul>
    </section>
  )
}