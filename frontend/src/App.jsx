import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../src/context/AuthContext';
import AppRouter from './router';
import Footer from './components/shared/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-container">
          <AppRouter />
          <Footer />
        </div>
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;