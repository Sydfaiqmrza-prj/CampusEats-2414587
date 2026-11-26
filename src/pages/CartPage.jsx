import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'
import { placeOrders } from '../services/orders.js'
import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'

export default function CartPage() {
  const { cart, total, changeQty, removeFromCart, changeNote, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  if (cart.length === 0) {
    return <p className="muted">Your cart is empty. Pick something from a menu first.</p>
  }

  async function handlePlaceOrder(details) {
    setError('')
    try {
      await placeOrders(user, cart, details)
      clearCart()
      navigate('/orders')
    } catch (err) {
      setError(`Could not place the order: ${err.message}`)
    }
  }

  return (
    <div className="cart-layout">
      <div className="card">
        <h2 className="section-title">Your cart</h2>
        <ul className="cart-list">
          {cart.map((line) => (
            <CartItem
              key={line.item.id}
              line={line}
              onChangeQty={changeQty}
              onRemove={removeFromCart}
              onChangeNote={changeNote}
            />
          ))}
        </ul>
        <p className="cart-total">Total: RM {total.toFixed(2)}</p>
        {error && (
          <p className="field-error" role="alert">
            {error}
          </p>
        )}
      </div>
      <CheckoutForm
        defaultName={user?.displayName ?? ''}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  )
}