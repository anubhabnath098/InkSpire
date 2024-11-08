"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Loading from '@/components/Loading/Loading';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useUser } from '@clerk/nextjs'; // Import Clerk's useUser hook
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

interface RentedBook {
    _id: string;
    username: string;
    book: Book;
    duration: number;
    amount:number;
    isReturned: boolean;
    createdAt: string;
    updatedAt: string;
}

interface ApiResponse {
    books: RentedBook[];
    message: string;
    status: boolean;
}

function Page() {
    const [rentedBooks, setRentedBooks] = useState<RentedBook[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [returnClick, setReturnClick] = useState(true);
    const [deleteClick, setDeleteClick] = useState(true);
    const router = useRouter();
    
    const { user, isLoaded, isSignedIn } = useUser();

    useEffect(() => {

        if (!isSignedIn) {
            const checkUser = async () => {
                await authenticate();
              };
              checkUser();
        }

        const fetchRentedBooks = async () => {
            try {
                if (!user) {
                    throw new Error("User information is not available");
                }
                const username = user.username;
                const response = await fetch(`/api/rent?username=${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data: ApiResponse = await response.json();
                setRentedBooks(data.books);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchRentedBooks();
    }, [returnClick, deleteClick, isLoaded, isSignedIn, user]);

    // Handle book return
    const handleReturn = async (id: string) => {
        try {
            const response = await axios.patch(`/api/rent/${id}`, {
                isReturned: true,
            });
            if (response.data.status) {
                alert("Book Returned Successfully");
            } else {
                alert("Can't Return Book. Try Again Later");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setReturnClick(!returnClick);
        }
    };

    // Handle book delete
    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/rent/${id}`);
            if (response.data.status) {
                alert("Book Deleted Successfully from Orders");
            } else {
                alert("Can't Delete Book. Try Again Later");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setDeleteClick(!deleteClick); 
        }
    };

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

    return (
        <div className="container mx-auto px-4 py-8 relative top-[50px] z-0 bg-gradient-to-r from-red-100 via-red-200 to-red-300 transition-all duration-300">
            <h1 className="text-3xl font-bold mb-8 text-center text-red-950 opacity-90 hover:opacity-100 transition-opacity duration-300">Your Rented Books</h1>
            <div className="space-y-6">
                {rentedBooks.map((rental) => (
                    <div
                        key={rental._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 ease-in-out max-w-2xl mx-auto"
                    >
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 relative h-48 md:h-auto overflow-hidden rounded-lg">
                                <Image
                                    src={rental.book.url}
                                    alt={rental.book.name}
                                    fill
                                    className="object-cover transition-all duration-500 ease-in-out hover:shadow-2xl"
                                />
                            </div>
                            <div className="p-6 md:w-2/3">
                                <div className="uppercase tracking-wide text-sm text-red-950 font-semibold">
                                    Rental Duration: {rental.duration} days
                                </div>
                                <h2 className="mt-2 text-xl font-bold text-gray-900">
                                    {rental.book.name}
                                </h2>
                                <p className="mt-2 text-gray-600">
                                    Author: {rental.book.author}
                                </p>
                                <div className="mt-4 flex flex-wrap gap-4">
                                    <div className="flex items-center">
                                        <span className="text-gray-700 font-medium">Price:</span>
                                        <span className="ml-2 text-green-600">${rental.amount}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-gray-700 font-medium">Lender:</span>
                                        <span className="ml-2 text-red-800">{rental.book.username}</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <span className={`px-4 py-3 rounded text-sm font-medium`}>
                                        {rental.isReturned ? (
                                            <div className='flex gap-5'>
                                                <button
                                                    className='hover:underline font-bold text-green-700 text-lg transition-colors duration-300'
                                                    onClick={e => router.push(`/library/${rental.book._id}`)}
                                                >
                                                    Rent Again
                                                </button>
                                                <DeleteOutlineIcon
                                                    className='hover:cursor-pointer hover:text-red-600 transition-colors duration-300'
                                                    onClick={e => handleDelete(rental._id)}
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <button
                                                    className='hover:underline font-bold text-red-950 text-lg transition-colors duration-300'
                                                    onClick={e => handleReturn(rental._id)}
                                                >
                                                    Return
                                                </button>
                                            </div>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;
