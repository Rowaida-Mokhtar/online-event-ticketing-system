import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // If no user data found, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  if (!user) return null; // or a loading spinner

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      {/* Your main page content */}
    </div>
  );
}

export default MainPage;
