"use client";

import React, { useEffect, useState } from 'react';
import { bookData } from '@/server/bookData'; // Importing server action
import BookCard from '../bookCard/bookCard';
import Image from 'next/image';
import Loading from '../Loading/Loading'

interface res_el {
    _id: string;
    name: string;
    url: string;
    author: string;
    description: string;
    price: number;
    isbn: string;
}

const BookList: React.FC = () => {
  // Provide the type for useState explicitly
  const [books, setBooks] = useState<res_el[] | null>([]); // Set the type to res_el[]
  const [loading, setLoading] = useState<boolean>(true); // Type for loading state

  const loadBooks = async () => {
    try {
      const data = await bookData();
      setBooks(data);
    } catch (error) {
      console.error("Error loading books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  if (loading) {
    return <Loading/>;
  }

  return (
    <div>
      {books && books.length  > 0 ? (
        <div>
          <h1 className='font-serif text-[2rem] ml-8 font-bold text-red-950'>Popular Picks</h1>
          <div className="w-[100%] flex justify-center items-start gap-[10px] mt-[5px]">
            
            {/* getting css problems while showing first book's cover image in side */}
            
            {/* <div className='flex justify-center items-center p-2 flex-col'>
              <Image className="rounded-md object-cover" alt="Book cover" src={books[0].url} height={450} width={450} />
            </div> */}

            <div className='grid grid-cols-3 gap-1.5'>
              {books.map((book) => (
                <BookCard key={book._id} data={book} /> // Use _id for the key
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='text-[50px] text-bold'>No Books Available</div>
      )}
    </div>
  );
};

export default BookList;