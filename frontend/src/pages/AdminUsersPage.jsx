import React, { useEffect, useState } from 'react';
import axios from '../services/axios';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/users');
        console.log('Fetched users:', res.data); // ✅ Debug
        setUsers(res.data);
      } catch (err) {
        setError('Failed to fetch users');
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <h2>Manage Users</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>Name</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>Email</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>Role</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{user.name}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{user.email}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{user.role}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{user.age || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsersPage;
