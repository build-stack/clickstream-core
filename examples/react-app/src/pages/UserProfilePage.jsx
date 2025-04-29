import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch user data
    setLoading(true);
    setTimeout(() => {
      // Mock user data
      setUser({
        id: userId,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        role: 'Administrator',
        joinDate: '2023-01-15',
        lastActive: new Date().toLocaleDateString(),
        profileImage: 'https://i.pravatar.cc/150?u=' + userId
      });
      setLoading(false);
    }, 800);
  }, [userId]);

  const handleRandomProfile = () => {
    // Navigate to a random user profile
    const randomId = 'user' + Math.floor(Math.random() * 1000);
    navigate(`/profile/${randomId}`);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="animate-pulse">
          <div className="rounded-full bg-gray-300 h-32 w-32 mx-auto mb-4"></div>
          <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="md:mr-8 mb-4 md:mb-0">
            <img 
              src={user.profileImage} 
              alt={user.name} 
              className="rounded-full w-32 h-32 object-cover border-4 border-blue-500"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
            <p className="text-gray-600 mb-4">User ID: {user.id}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium">{user.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Join Date</p>
                <p className="font-medium">{user.joinDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Active</p>
                <p className="font-medium">{user.lastActive}</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => alert('Profile edit would open here')}
              >
                Edit Profile
              </button>
              <button 
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                onClick={handleRandomProfile}
              >
                View Random Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Activity Feed</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border-b pb-4 last:border-0">
              <p className="font-medium">
                {['Logged in', 'Updated profile', 'Viewed dashboard', 'Downloaded report'][i-1]}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(Date.now() - i * 3600000).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage; 