// src/components/shared/SidebarMenu.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartBar, FaPlus, FaTicketAlt, FaUsersCog, FaListAlt } from 'react-icons/fa';

const SidebarMenu = ({ role, onClose }) => {
  const navigate = useNavigate();

 
  const is = (r) => role?.toLowerCase() === r.toLowerCase(); // ignore case

  const menuItems = [];

  if (is('organizer')) {
    menuItems.push(
      { label: 'Create Event', icon: <FaPlus />, path: '/my-events/new' },
      { label: 'Event Analytics', icon: <FaChartBar />, path: '/my-events/analytics' }
    );
  }

  if (is('user')) {
    menuItems.push(
      { label: 'Booking Details', icon: <FaTicketAlt />, path: '/bookings' }
    );
  }

  if (is('admin')) {
    menuItems.push(
      { label: 'Manage Users', icon: <FaUsersCog />, path: '/admin/users' },
      { label: 'Manage Events', icon: <FaListAlt />, path: '/admin/events' }
    );
  }

  if (menuItems.length === 0) {
    return (
      <div style={{ position: 'absolute', left: 10, top: 50, background: '#fff', padding: 20, border: '1px solid #ddd' }}>
        <p>No menu items for role: {role}</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <div style={{
      position: 'absolute',
      left: 10,
      top: 60,
      background: '#fff',
      border: '1px solid #ccc',
      borderRadius: 8,
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      padding: 16,
      zIndex: 1000,
    }}>
      {menuItems.map((item, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 12, cursor: 'pointer' }}
             onClick={() => { navigate(item.path); onClose(); }}>
          <span style={{ marginRight: 8 }}>{item.icon}</span> {item.label}
        </div>
      ))}
    </div>
  );
};

export default SidebarMenu;
