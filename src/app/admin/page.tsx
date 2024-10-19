"use client";
import Loading from '@/components/Loading/Loading';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface User {
  clerkId: string;
  username: string;
  email: string;
  score: number;
  reports: number;
  admin: boolean;
}

function AdminPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const [access, setAccess] = useState(false);
  const [showUsers, setShowUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch username from localStorage when component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Fetch admin status and users when username is available
  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (username) {
        setLoading(true);
        try {
          const response = await axios.get(`/api/admin?username=${username}`);
          console.log("Admin Status Response:", response.data);
          if (response.data.status === true) {
            setShowUsers(response.data.users);
            setAccess(true);
          } else {
            setAccess(false);
            console.log("Admin access denied");
          }
        } catch (err) {
          console.error("Error fetching admin status:", err);
          setAccess(false);
        } finally {
          setLoading(false);
        }
      }
    };
    if (username && access) {
      fetchAdminStatus();
    }
  }, [username, access]);

  // Handle Admin login submission
  const handleSubmit = async () => {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      alert("Username is missing");
      return;
    }
    console.log("Username:", storedUsername);
    console.log("Password:", password);

    setLoading(true);
    try {

      const response = await axios.post("/api/admin", {
        username: localStorage.getItem('username'),
        password: password
      });

      console.log("Login Response:", response);

      if (response.data.status === true) {
        setAccess(true);
        setUsername(storedUsername);  // Ensure username is correctly set
      } else {
        console.log(response.data.message);
        alert(response.data.message);
      }
    } catch (err) {
      console.log("Error logging in:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.put("/api/admin/logout", {
        username: localStorage.getItem('username')
      });
      if (response.data.status === true) {
        setAccess(false);
        setShowUsers([]);
      }
    } catch (err) {
      console.error("Error logging out:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      {!access && (
        <div>
          <div>Enter Admin Password</div>
          <input
            type="password"
            className='border-2 border-black'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button className="ml-2" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
      {access && (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <div className="flex flex-col mt-4">
            {showUsers.length > 0 ? (
              showUsers.map((user) => (
                <div className='flex gap-4' key={user.clerkId}>
                  <span>{user.username}</span>
                  <span>{user.email}</span>
                  <span>{user.score.toString()}</span>
                  <span>{user.reports.toString()}</span>
                </div>
              ))
            ) : (
              <div>No users found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
