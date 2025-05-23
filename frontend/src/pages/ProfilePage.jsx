import React from 'react';
import UpdateProfileForm from '../components/user/UpdateProfileForm';

const ProfilePage = () => {
  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: 'auto' }}>
      <h2>My Profile</h2>
      <UpdateProfileForm />
    </div>
  );
};

export default ProfilePage;
