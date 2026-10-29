import { useState } from 'react';
import { CartContext } from './cart-context.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', []);
  const [orders, setOrders] = useLocalStorage('campuseats-orders', []);

  const count = cart.reduce((total, line) => total + line.qty, 0);
  const total = cart.reduce((sum, line) => sum + (line.item.price * line.qty), 0);

  function addToCart(item, note = '') {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id);
      if (existing) {
        return prev.map((line) => line.item.id === item.id ? { ...line, qty: line.qty + 1, note: note || line.note } : line);
      }
      return [...prev, { item, qty: 1, note }];
    });
  }

  function changeQty(itemId, delta) {
    setCart((prev) => prev.map((line) => {
      if (line.item.id === itemId) {
        return { ...line, qty: line.qty + delta };
      }
      return line;
    }).filter((line) => line.qty > 0));
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId));
  }

  function changeNote(itemId, newNote) {
    setCart((prev) => prev.map((line) => {
      if (line.item.id === itemId) {
        return { ...line, note: newNote };
      }
      return line;
    }));
  }

  function placeOrder(details) {
    const orderTotal = cart.reduce((sum, line) => sum + (line.item.price * line.qty), 0);
    const newOrder = { ...details, items: [...cart], total: orderTotal, id: Date.now() };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, orders, count, total, addToCart, changeQty, removeFromCart, changeNote, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
}