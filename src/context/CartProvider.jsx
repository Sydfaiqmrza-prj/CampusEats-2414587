import { useState } from 'react';
import { CartContext } from './cart-context.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { useAuth } from '../hooks/useAuth.js';

function CartStateManager({ cart, setCart, orders, setOrders, isSignedIn, children }) {
  const count = cart.reduce((total, line) => total + line.qty, 0);
  const total = cart.reduce((sum, line) => sum + (line.item.price * line.qty), 0);

  function addToCart(item, note = '') {
    const safeNote = isSignedIn ? note : '';
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id);
      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1, note: safeNote || line.note }
            : line
        );
      }
      return [...prev, { item, qty: 1, note: safeNote }];
    });
  }

  function changeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) => {
          if (line.item.id === itemId) {
            return { ...line, qty: line.qty + delta };
          }
          return line;
        })
        .filter((line) => line.qty > 0)
    );
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId));
  }

  function changeNote(itemId, newNote) {
    if (!isSignedIn) return;
    setCart((prev) =>
      prev.map((line) => {
        if (line.item.id === itemId) {
          return { ...line, note: newNote };
        }
        return line;
      })
    );
  }

  function placeOrder(details) {
    const orderTotal = cart.reduce((sum, line) => sum + (line.item.price * line.qty), 0);
    const newOrder = { ...details, items: [...cart], total: orderTotal, id: Date.now() };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ cart, orders, count, total, addToCart, changeQty, removeFromCart, changeNote, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
}

function UserCartProvider({ uid, children }) {
  const [cart, setCart] = useLocalStorage(`ce-cart-${uid}`, []);
  const [orders, setOrders] = useLocalStorage(`ce-orders-${uid}`, []);

  return (
    <CartStateManager
      cart={cart}
      setCart={setCart}
      orders={orders}
      setOrders={setOrders}
      isSignedIn={true}
    >
      {children}
    </CartStateManager>
  );
}

function GuestCartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('ce-cart-guest', []);
  const [orders, setOrders] = useState([]);

  return (
    <CartStateManager
      cart={cart}
      setCart={setCart}
      orders={orders}
      setOrders={setOrders}
      isSignedIn={false}
    >
      {children}
    </CartStateManager>
  );
}

export function CartProvider({ children }) {
  const { user } = useAuth();

  if (user) {
    return (
      <UserCartProvider key={user.uid} uid={user.uid}>
        {children}
      </UserCartProvider>
    );
  }

  return <GuestCartProvider>{children}</GuestCartProvider>;
}