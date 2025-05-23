// src/components/shared/SidebarMenu.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartBar, FaPlus, FaTicketAlt, FaUsersCog, FaListAlt, FaArrowLeft } from 'react-icons/fa';

const SidebarMenu = ({ role, onClose }) => {
  const navigate = useNavigate();

  const is = (r) => role?.toLowerCase() === r.toLowerCase(); // case-insensitive compare

  const menuGroups = [];

  if (is('user')) {
    menuGroups.push({
      label: 'User Menu',
      items: [
        { label: 'My Bookings', icon: <FaTicketAlt />, path: '/bookings' },
      ],
    });
  }

  if (is('organizer')) {
    menuGroups.push({
      label: 'Organizer Menu',
      items: [
        { label: 'My Events', icon: <FaListAlt />, path: '/my-events' },
        { label: 'Create Event', icon: <FaPlus />, path: '/my-events/new' },
        { label: 'Event Analytics', icon: <FaChartBar />, path: '/my-events/analytics' },
      ],
    });
  }

  if (is('admin')) {
    menuGroups.push({
      label: 'Admin Menu',
      items: [
        { label: 'Manage Users', icon: <FaUsersCog />, path: '/admin/users' },
        { label: 'Manage Events', icon: <FaListAlt />, path: '/admin/events' },
      ],
    });
  }

  if (menuGroups.length === 0) {
    return (
      <div style={{
        position: 'absolute',
        left: 10,
        top: 50,
        background: '#fff',
        padding: 20,
        border: '1px solid #ddd'
      }}>
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
      minWidth: 200,
    }}>
      {menuGroups.map((group, groupIndex) => (
        <div key={groupIndex} style={{ marginBottom: 20 }}>
          <strong>{group.label}</strong>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {group.items.map((item, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 12,
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: 4,
                  transition: 'background 0.2s',
                }}
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
              >
                <span style={{ marginRight: 8 }}>{item.icon}</span> {item.label}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <hr />
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#007bff',
            cursor: 'pointer',
            fontSize: '0.9rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FaArrowLeft style={{ marginRight: 5 }} /> Close
        </button>
      </div>
    </div>
  );
};

export default SidebarMenu;