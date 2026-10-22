import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'
import CartPage from './components/CartPage.jsx'

function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cart, setCart] = useState([])
  const [view, setView] = useState('menu')
  const [lastOrder, setLastOrder] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setVendors(data)
        if (data.length > 0) {
          setSelectedVendorId(data[0].id)
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [reloadKey])

  const cartCount = cart.reduce((total, line) => total + line.qty, 0)

  function handleAddToCart(item) {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id)
      if (existing) {
        return prev.map((line) => line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line)
      }
      return [...prev, { item, qty: 1, note: '' }]
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prev) => prev.map((line) => {
      if (line.item.id === itemId) {
        return { ...line, qty: line.qty + delta }
      }
      return line
    }).filter((line) => line.qty > 0))
  }

  function handleRemove(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId))
  }

  function handleChangeNote(itemId, newNote) {
    setCart((prev) => prev.map((line) => {
      if (line.item.id === itemId) {
        return { ...line, note: newNote }
      }
      return line
    }))
  }

  function handlePlaceOrder(details) {
    const total = cart.reduce((sum, line) => sum + (line.item.price * line.qty), 0)
    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  let content
  if (view === 'cart') {
    content = <CartPage cart={cart} onChangeQty={handleChangeQty} onRemove={handleRemove} onPlaceOrder={handlePlaceOrder} onChangeNote={handleChangeNote} />
  } else if (view === 'done') {
    content = (
      <div className="card">
        <h2>Order placed!</h2>
        <p>Thank you, {lastOrder.name}.</p>
        <p>Pickup time: {lastOrder.pickupTime}</p>
        <p>Total paid: RM {lastOrder.total.toFixed(2)}</p>
      </div>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={() => setReloadKey((k) => k + 1)} />
  } else {
    const selectedVendor = vendors.find((v) => v.id === selectedVendorId)
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>
        {selectedVendor && (
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>
            <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
          </section>
        )}
      </>
    )
  }

  return (
    <>
      <Header cartCount={cartCount} onShowMenu={() => setView('menu')} onShowCart={() => setView('cart')} />
      <main className="container">{content}</main>
      <Footer />
    </>
  )
}

export default App