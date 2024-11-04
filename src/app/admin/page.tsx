"use client";
import Details from "@/components/Details/Details";
import Loading from "@/components/Loading/Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import authenticate from "@/server/action";
import { AdminDashboardComponent } from "@/components/admin-dashboard";

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
  const { user, isLoaded, isSignedIn } = useUser();
  const [password, setPassword] = useState<string>("");
  const [access, setAccess] = useState<boolean>(false);
  const [showUsers, setShowUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteClick, setDeleteClick] = useState(true);
  const [rentedBooks, setRentedBooks] = useState<Rent[]>([]);
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [lendedBooks, setLendedBooks] = useState<Book[]>([]);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      const checkUser = async () => {
        await authenticate();
      };
      checkUser();
    }
    if (isLoaded && user) {
      const checkAdminStatus = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `/api/admin?username=${user.username}`
          );
          if (response.data.status === true) {
            setShowUsers(response.data.users);
            setAccess(true);
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
      };

      checkAdminStatus();
    }
  }, [isLoaded, user]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/admin", {
        username: user?.username,
        password: password,
      });

      if (response.data.status === true) {
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

  const handleUser = async (id: string) => {
    setSelectedUserId(id);
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/admin/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();

      if (data.status) {
        setRentedBooks(data.data.rentedBooks);
        setCartItems(data.data.cartItems);
        setLendedBooks(data.data.lendedBooks);
      } else {
        throw new Error(data.message || "Unknown error occurred");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
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
          <div className="flex flex-col mt-4">
            {showUsers.length > 0 ? (
              <AdminDashboardComponent users={showUsers} />
            ) : (
              <div>No users found</div>
            )}
          </div>

          {selectedUserId != null && (
            <div className="mt-4">
              <Details
                rented={rentedBooks}
                cart={cartItems}
                lended={lendedBooks}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
