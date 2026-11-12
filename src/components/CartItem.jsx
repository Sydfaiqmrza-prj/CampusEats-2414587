import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'

function CartItem({ line, onChangeQty, onRemove, onChangeNote }) {
  const { user } = useAuth()
  const { item, qty, note = '' } = line

  return (
    <li className="cart-line">
      <div>
        <p className="cart-name">{item.name}</p>
        <p className="muted">RM {item.price.toFixed(2)} each</p>
        {user ? (
          <textarea
            rows="2"
            value={note}
            onChange={(e) => onChangeNote(item.id, e.target.value)}
            placeholder="Add a note (e.g., no spicy)"
            className="note-textarea"
          />
        ) : (
          <p className="muted">
            <Link to="/login">Log in to add notes</Link>
          </p>
        )}
      </div>
      <div className="qty">
        <button type="button" onClick={() => onChangeQty(item.id, -1)}>
          -
        </button>
        <span>{qty}</span>
        <button type="button" onClick={() => onChangeQty(item.id, 1)}>
          +
        </button>
      </div>
      <p className="line-total">RM {(item.price * qty).toFixed(2)}</p>
      <button type="button" className="link danger" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </li>
  )
}

export default CartItem