// src/pages/UnauthorizedPage.jsx
import React from 'react';

const UnauthorizedPage = ({ reason }) => {
  return (
    <div style={{
      maxWidth: '600px',
      margin: '50px auto',
      padding: '30px',
      border: '2px solid #f44336',
      backgroundColor: '#ffe6e6',
      color: '#d32f2f',
      borderRadius: '10px',
      textAlign: 'center',
      fontWeight: 'bold',
    }}>
      <h2>Unauthorized Access</h2>
      <p>{reason}</p>
    </div>
  );
};

export default UnauthorizedPage;