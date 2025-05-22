import React from 'react';

// Auth Context
import { AuthProvider } from './context/AuthContext';

// Components
import ToastNotification from './shared/ToastNotification';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

// Routing
import AppRouter from './router';

// App.js
function App() {
  return (
    <AuthProvider>
      <>
        <ToastNotification />
        <Navbar />

        {/* Main Content */}
        <main className="app-main">
          <AppRouter />
        </main>

        <Footer />
      </>
    </AuthProvider>
  );
}


export default App;