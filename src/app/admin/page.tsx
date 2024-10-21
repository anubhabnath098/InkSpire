"use client";
import Details from '@/components/Details/Details';
import Loading from '@/components/Loading/Loading';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface User {
  _id: string;
  clerkId: string;
  username: string;
  email: string;
  score: number;
  reports: number;
  admin: boolean;
}

export interface Book {
  _id: string;
  name: string;
  author: string;
  url: string;
  description: string;
  price: number;
  isbn: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Cart {
  _id: string;
  username: string;
  book: Book;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Rent {
  _id: string;
  username: string;
  book: Book;
  duration: number;
  isReturned: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}


function AdminPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string>(''); 
  const [access, setAccess] = useState<boolean>(false); 
  const [showUsers, setShowUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteClick, setDeleteClick] = useState(true);
  const [rentedBooks, setRentedBooks] = useState<[Rent]|[]>([]);
  const [cartItems, setCartItems] = useState<[Cart]|[]>([]);
  const [lendedBooks, setLendedBooks] = useState<[Book] | []>([]);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const storedUsername = localStorage.getItem('username');
      const storedAdmin = localStorage.getItem('admin');
  
      if (storedUsername) {
        setUsername(storedUsername);
      }
  
      if (storedAdmin === 'true') {
        setAccess(true);
      }
    }, 1000);
    setLoading(false);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (username&&access) {
        setLoading(true);
        try {
          const response = await axios.get(`/api/admin?username=${username}`);
          if (response.data.status === true) {
            setShowUsers(response.data.users);
          } else {
            console.log("Admin access denied");
            setAccess(false);
          }
        } catch (err) {
          console.error("Error fetching admin status:", err);
          setAccess(false);
        } finally {
          setLoading(false);
        }
      }
    };

    if (access) {
      fetchAdminStatus();
    }
  }, [access,username, deleteClick]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/admin", {
        username: username,
        password: password,
      });

      if (response.data.status === true) {
        localStorage.setItem('admin', 'true');
        setAccess(true);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.log("Error logging in:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.put("/api/admin/logout", {
        username: username
      });
      if (response.data.status === true) {
        setAccess(false);
        setShowUsers([]);
        setSelectedUserId(null);
      }
      
    } catch (err) {
      console.error("Error logging out:", err);
    } finally {
      localStorage.removeItem('admin');
      setLoading(false);
    }
  };

  const handleUser = async (id: string) => {
    setSelectedUserId(id);
    try {
      setLoading(true);
      setError(null); 
  
      const response = await fetch(`/api/admin/${id}`);
  
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const data = await response.json();
  
      if (data.status) {
        setRentedBooks(data.data.rentedBooks);
        setCartItems(data.data.cartItems);
        setLendedBooks(data.data.lendedBooks);
      } else {
        throw new Error(data.message || 'Unknown error occurred');
      }
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/delete?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok && data.status) {
        console.log("User deleted successfully:", data.message);
        setDeleteClick(!deleteClick);
      } else {
        console.error("Failed to delete user:", data.message);
      }
    } catch (error) {
      console.error("Error occurred while deleting user:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {!access ? (
        <div>
          <div>Enter Admin Password</div>
          <input
            type="password"
            className="border-2 border-black"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button className="ml-2" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <div className="flex flex-col mt-4">
            {showUsers.length > 0 ? (
              showUsers.map((user) => (
                <div className="flex gap-4" key={user.clerkId}>
                  <span>{user.username}</span>
                  <span>{user.email}</span>
                  <span>{user.score.toString()}</span>
                  <span>{user.reports.toString()}</span>
                  <span 
                    className="cursor-pointer underline" 
                    onClick={e => handleUser(user._id)}> 
                    more
                  </span>
                  <button onClick={() => handleDelete(user._id)}><DeleteIcon/></button>
                </div>
              ))
            ) : (
              <div>No users found</div>
            )}
          </div>

          {selectedUserId!=null && (
            <div className="mt-4">
              <Details rented={rentedBooks} cart={cartItems} lended={lendedBooks} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
