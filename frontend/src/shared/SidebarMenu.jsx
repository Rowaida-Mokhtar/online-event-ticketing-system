import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartBar, FaPlus, FaTicketAlt, FaTools } from 'react-icons/fa';
import SidebarMenu from '../shared/SidebarMenu';


const SidebarMenu = ({ role, onClose }) => {
  const navigate = useNavigate();

  console.log('SIDEBAR ROLE:', role); // You must see this log

  const items = [];

  if (role === 'Organizer') {
    items.push({ icon: <FaChartBar />, label: 'Event Analytics', path: '/my-events/analytics' });
    items.push({ icon: <FaPlus />, label: 'Create Event', path: '/my-events/new' });
  }
  if (role === 'User') {
    items.push({ icon: <FaTicketAlt />, label: 'Booking Details', path: '/bookings' });
  }
  if (role === 'Admin') {
    items.push({ icon: <FaTools />, label: 'Admin Events', path: '/admin/events' });
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '250px',
      height: '100%',
      backgroundColor: '#fff',
      padding: '20px',
      boxShadow: '2px 0 10px rgba(0,0,0,0.2)',
      zIndex: 1000
    }}>
      <button onClick={onClose} style={{
        float: 'right',
        border: 'none',
        background: 'none',
        fontSize: '20px',
        cursor: 'pointer'
      }}>×</button>

      <h3 style={{ marginBottom: '20px' }}>Menu</h3>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item, index) => (
          <li key={index}
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 0',
                cursor: 'pointer'
              }}>
            <span style={{ marginRight: '10px' }}>{item.icon}</span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenu;
