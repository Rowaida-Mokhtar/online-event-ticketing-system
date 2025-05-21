// src/App.jsx
import AppRouter from './router';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import ToastNotification from './shared/ToastNotification';

function App() {
  return (
    <>
      <ToastNotification />
      <Navbar />
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
