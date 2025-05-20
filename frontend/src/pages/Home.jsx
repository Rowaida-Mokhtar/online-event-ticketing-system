import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Eventify 🎟️</h1>
      <div className="space-x-4">
        <Link to="/login">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
