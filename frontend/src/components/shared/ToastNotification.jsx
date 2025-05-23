// src/shared/ToastNotification.jsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastNotification() {
  return <ToastContainer position="top-right" autoClose={3000} hideProgressBar />;
}

export default ToastNotification;
