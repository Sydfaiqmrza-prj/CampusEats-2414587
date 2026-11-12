import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'

function MenuItemCard({ item, onAdd }) {
  const { user } = useAuth()
  const location = useLocation()
  const [showNote, setShowNote] = useState(false)
  const [note, setNote] = useState('')

  function handleAdd() {
    onAdd(item, note)
    setNote('')
    setShowNote(false)
  }

  return (
    <article className="card menu-card">
      <div className="menu-card-top">
        <div className="thumb" aria-hidden="true">
          {item.name.charAt(0)}
        </div>
        <div>
          <p className="category">{item.category}</p>
          <h3>{item.name}</h3>
        </div>
      </div>

      <p className="muted">{item.description}</p>
      <p className="price">RM {item.price.toFixed(2)}</p>

      <div className="note-section">
        {user ? (
          <>
            <button
              type="button"
              className="note-toggle"
              onClick={() => setShowNote((prev) => !prev)}
            >
              {showNote ? 'Hide note' : 'Add note'}
            </button>
            {showNote && (
              <textarea
                rows="2"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note (e.g., no spicy)"
                className="note-textarea"
              />
            )}
          </>
        ) : (
          <p className="muted">
            <Link to="/login" state={{ from: location.pathname }}>
              Log in to add notes
            </Link>
          </p>
        )}
      </div>

      <button type="button" className="btn" disabled={!item.available} onClick={handleAdd}>
        {item.available ? 'Add to cart' : 'Sold out'}
      </button>
    </article>
  )
}

export default MenuItemCard