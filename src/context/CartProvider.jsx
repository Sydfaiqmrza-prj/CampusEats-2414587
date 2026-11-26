import { useState } from 'react'
import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { useAuth } from '../hooks/useAuth.js'

function CartStateManager({ cart, setCart, isSignedIn, children }) {
  const count = cart.reduce((total, line) => total + line.qty, 0)
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)

  function addToCart(item, note = '') {
    const safeNote = isSignedIn ? note : ''
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id)
      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1, note: safeNote || line.note }
            : line,
        )
      }
      return [...prev, { item, qty: 1, note: safeNote }]
    })
  }

  function changeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line,
        )
        .filter((line) => line.qty > 0),
    )
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId))
  }

  function changeNote(itemId, newNote) {
    if (!isSignedIn) return
    setCart((prev) =>
      prev.map((line) =>
        line.item.id === itemId ? { ...line, note: newNote } : line,
      ),
    )
  }

  function clearCart() {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        count,
        total,
        addToCart,
        changeQty,
        removeFromCart,
        changeNote,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

function UserCartProvider({ uid, children }) {
  const [cart, setCart] = useLocalStorage(`ce-cart-${uid}`, [])
  return (
    <CartStateManager cart={cart} setCart={setCart} isSignedIn={true}>
      {children}
    </CartStateManager>
  )
}

function GuestCartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('ce-cart-guest', [])
  return (
    <CartStateManager cart={cart} setCart={setCart} isSignedIn={false}>
      {children}
    </CartStateManager>
  )
}

export function CartProvider({ children }) {
  const { user } = useAuth()
  if (user) {
    return (
      <UserCartProvider key={user.uid} uid={user.uid}>
        {children}
      </UserCartProvider>
    )
  }
  return <GuestCartProvider>{children}</GuestCartProvider>
}