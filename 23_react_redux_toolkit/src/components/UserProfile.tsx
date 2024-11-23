import React, { useState } from 'react';
import { login, logout, updateProfile } from '../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';

const UserProfile: React.FC = () => {
  const user = useAppSelector(state => state.user.currentUser);
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    dispatch(login({
      id: 1,
      name,
      email
    }));
  };

  return (
    <div className="p-4 border rounded-lg">
      {!isAuthenticated ? (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Login</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Login
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold">Profile</h2>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <button
            onClick={() => dispatch(logout())}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;