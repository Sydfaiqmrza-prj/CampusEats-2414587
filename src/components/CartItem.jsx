function CartItem({ line, onChangeQty, onRemove, onChangeNote }) {
  const { item, qty, note = '' } = line
  return (
    <li className="cart-line">
      <div>
        <p className="cart-name">{item.name}</p>
        <p className="muted">RM {item.price.toFixed(2)} each</p>
        <textarea 
          value={note} 
          onChange={(e) => onChangeNote(item.id, e.target.value)} 
          placeholder="Add a note (e.g., no spicy)"
          style={{ width: '100%', marginTop: '0.5rem', padding: '0.25rem', borderRadius: '4px', border: '1px solid #c5cbd3', font: 'inherit', fontSize: '0.85rem' }}
        />
      </div>
      <div className="qty">
        <button type="button" onClick={() => onChangeQty(item.id, -1)}>-</button>
        <span>{qty}</span>
        <button type="button" onClick={() => onChangeQty(item.id, 1)}>+</button>
      </div>
      <p className="line-total">RM {(item.price * qty).toFixed(2)}</p>
      <button type="button" className="link danger" onClick={() => onRemove(item.id)}>Remove</button>
    </li>
  )
}
export default CartItem