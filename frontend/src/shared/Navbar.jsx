// src/shared/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-blue-600 text-white p-4">
      <Link to="/" className="text-xl font-bold">🎟️ Eventify</Link>
      {/* Removed right-side links */}
    </nav>
  );
}

export default Navbar;
