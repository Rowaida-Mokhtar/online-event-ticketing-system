import React, { useEffect, useState } from 'react';
import axios from '../services/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [confirmModal, setConfirmModal] = useState({ show: false, userId: null });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/users');
        setUsers(res.data);
      } catch (err) {
        setError('Failed to fetch users');
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteClick = (userId) => {
    setConfirmModal({ show: true, userId });
  };

  const confirmDeleteUser = async () => {
    const { userId } = confirmModal;
    try {
      await axios.delete(`/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      toast.success('User deleted successfully');
    } catch (err) {
      setError('Failed to delete user');
      toast.error('Failed to delete user');
      console.error(err);
    } finally {
      setConfirmModal({ show: false, userId: null });
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await axios.put(`/users/${userId}`, { role: newRole });
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, role: res.data.role } : user
        )
      );
      toast.success('User role updated successfully');
    } catch (err) {
      setError('Failed to update role');
      toast.error('Failed to update role');
      console.error(err);
    }
  };

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
              <th style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{user.name}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{user.email}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    style={{
                      padding: '5px',
                      borderRadius: '4px',
                      border: '1px solid #ccc'
                    }}
                  >
                    <option value="user">User</option>
                    <option value="organizer">Organizer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{user.age || '—'}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                  <button
                    onClick={() => handleDeleteClick(user._id)}
                    style={{
                      background: '#ffc0cb',
                      color: 'black',
                      border: 'none',
                      padding: '5px 10px',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      marginLeft: '10px'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

     {confirmModal.show && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  }}>
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      width: '300px',
      textAlign: 'center'
    }}>
      <h3 style={{ color: 'black' }}>Confirm Delete</h3>
      <p style={{ color: 'black' }}>Are you sure you want to delete this user?</p>
      <div>
        <button
          onClick={confirmDeleteUser}
          style={{
            background: '#ffc0cb',
            color: 'black',
            border: 'none',
            padding: '6px 12px',
            marginRight: '10px',
            borderRadius: '4px'
          }}
        >
          Yes
        </button>
        <button
          onClick={() => setConfirmModal({ show: false, userId: null })}
          style={{
            background: '#ffc0cb',
            color: 'black',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px'
          }}
        >
          No
        </button>
      </div>
    </div>
  </div>
)}

   
    </div>
  );
};

export default AdminUsersPage;
