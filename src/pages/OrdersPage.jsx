import { useCart } from '../hooks/useCart.js';

export default function OrdersPage() {
  const { orders } = useCart();

  if (orders.length === 0) {
    return <p className="muted">No past orders yet.</p>;
  }

  return (
    <div>
      <h2 className="section-title">My Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="card" style={{ marginBottom: '1rem' }}>
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Mahallah:</strong> {order.mahallah}</p>
          <p><strong>Pickup time:</strong> {order.pickupTime}</p>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.2rem' }}>
            {order.items.map((line) => (
              <li key={line.item.id}>
                {line.qty}x {line.item.name} (RM {(line.item.price * line.qty).toFixed(2)})
                {line.note && <p className="muted" style={{ margin: '0 0 0.5rem', fontSize: '0.85rem' }}>Note: {line.note}</p>}
              </li>
            ))}
          </ul>
          <p className="cart-total">Total Paid: RM {order.total.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
