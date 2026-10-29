import { NavLink } from 'react-router';
import { useCart } from '../hooks/useCart.js';

export default function Header() {
  const { count } = useCart();

  return (
    <header className="header">
      <h1 className="logo">CampusEats</h1>
      <nav className="nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'link active' : 'link'}>
          Vendors
        </NavLink>
        <NavLink to="/orders" className={({ isActive }) => isActive ? 'link active' : 'link'}>
          My Orders
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => isActive ? 'link active cart' : 'link cart'}>
          Cart <span className="badge">{count}</span>
        </NavLink>
      </nav>
    </header>
  );
}