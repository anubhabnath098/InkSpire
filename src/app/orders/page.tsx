"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Loading from '@/components/Loading/Loading';

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

    useEffect(() => {
        const fetchRentedBooks = async () => {
            try {
                const response = await fetch(`/api/rent?username=${localStorage.getItem('username')}`);
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
    }, []);

    if (loading) {
        return (
            <Loading/>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 relative top-[50px] z-0">
            <h1 className="text-3xl font-bold mb-8 text-center">Your Rented Books</h1>
            <div className="space-y-6">
                {rentedBooks.map((rental) => (
                    <div 
                        key={rental._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-2xl mx-auto"
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
                                        <span className="ml-2 text-green-600">${rental.book.price}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-gray-700 font-medium">Lender:</span>
                                        <span className="ml-2 text-red-800">{rental.book.username}</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        rental.isReturned 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {rental.isReturned ? 'Returned' : 'Not Returned'}
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