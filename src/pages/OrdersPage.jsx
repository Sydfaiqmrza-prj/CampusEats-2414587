import { useCart } from '../hooks/useCart.js'

export default function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return <p className="muted">No past orders yet.</p>
  }

  return (
    <section>
      <h2 className="section-title">My Orders</h2>
      <div className="orders-list-wrap">
        {orders.map((order) => (
          <div key={order.id} className="card order-card">
            <p>
              <strong>Name:</strong> {order.name}
            </p>
            <p>
              <strong>Mahallah:</strong> {order.mahallah}
            </p>
            <p>
              <strong>Pickup time:</strong> {order.pickupTime}
            </p>
            <ul className="orders-items">
              {order.items.map((line) => (
                <li key={line.item.id}>
                  {line.qty}x {line.item.name} (RM {(line.item.price * line.qty).toFixed(2)})
                  {line.note && <span className="order-note">Note: {line.note}</span>}
                </li>
              ))}
            </ul>
            <p className="cart-total">Total Paid: RM {order.total.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}