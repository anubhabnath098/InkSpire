"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Loading from '@/components/Loading/Loading';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import authenticate from '@/server/action';

interface Book {
    _id: string;
    name: string;
    author: string;
    url: string;
    description: string;
    price: number;
    isbn: string;
    username: string;
}

interface CartBook {
    _id: string;
    username: string;
    book: Book;
}

interface ApiResponse {
    books: CartBook[];
    message: string;
    status: boolean;
}

function Page() {
    const { user, isSignedIn } = useUser();
    const [cartBooks, setCartBooks] = useState<CartBook[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [input, setInput] = useState(false);
    const [duration, setDuration] = useState(0);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [deleteClick, setDeleteClick] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!isSignedIn) {
            const checkUser = async () => {
                await authenticate();
              };
              checkUser();
        }
        if (user) {
            const fetchCartBooks = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`/api/addtocart?username=${user.username}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const data: ApiResponse = await response.json();
                    setCartBooks(data.books);
                } catch (err) {
                    setError(err instanceof Error ? err.message : 'An error occurred');
                } finally {
                    setLoading(false);
                }
            };

            fetchCartBooks();
        } else {
            setError("No user found");
            setLoading(false);
        }
    }, [user, deleteClick]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/addtocart/${id}`);
            if (!response.data) {
                throw new Error('Failed to delete item from cart');
            }
            console.log("Deleted item successfully");
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setDeleteClick(!deleteClick);
        }
    };

    const handleRent = async (id: string, cartId: string) => {
        setActiveId(cartId);
        if (input) {
            try {
                const response = await axios.post(`http://localhost:3000/api/rent/${id}`, {
                    username: user?.username,
                    duration: duration,
                });

                if (response.data.status === true) {
                    await axios.delete(`http://localhost:3000/api/addtocart/${cartId}`);
                    router.push("/orders");
                } else {
                    setInput(false);
                    alert(response.data.message);
                }
            } catch (err) {
                setInput(false);
                alert("Issue. Try again later");
            }
        } else {
            setInput(true);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 relative top-[50px] z-0 bg-gradient-to-r from-red-100 via-red-200 to-red-300 transition-all duration-300">
            <h1 className="text-3xl font-bold mb-8 text-center text-red-950">Your Cart</h1>
            <div className="space-y-6">
                {cartBooks.map((rental) => (
                    <div
                        key={rental._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 ease-in-out max-w-2xl mx-auto"
                    >
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 relative h-48 md:h-auto">
                                <Image
                                    src={rental.book.url}
                                    alt={rental.book.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6 md:w-2/3">
                                <h2 className="mt-2 text-xl font-bold text-gray-900 flex justify-between">
                                    {rental.book.name}
                                </h2>
                                <p className="mt-2 text-gray-600">Author: {rental.book.author}</p>
                                <div className="mt-4 flex flex-wrap gap-4">
                                    <div className="flex items-center">
                                        <span className="text-gray-700 font-medium">Price:</span>
                                        <span className="ml-2 text-green-600">${rental.book.price}</span>
                                    </div>
                                    <div className="flex items-center w-full">
                                        <span className="text-gray-700 font-medium">Lender:</span>
                                        <span className="ml-2 text-red-800">{rental.book.username}</span>
                                    </div>
                                    <div className="flex gap-5">
                                        <DeleteOutlineIcon className="hover:cursor-pointer" onClick={() => handleDelete(rental._id)} />
                                        <span className="rent_now flex gap-6">
                                            <LocalMallIcon className="hover:cursor-pointer" onClick={() => handleRent(rental.book._id, rental._id)} />
                                            {input && activeId === rental._id && (
                                                <div>
                                                    Duration <input className="h-[40px] w-[70px] p-3 rounded border-2 border-gray-700" type="number" value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} placeholder="Enter Duration" />
                                                </div>
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;
