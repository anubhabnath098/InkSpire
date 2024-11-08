"use client";
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import BookCard from '../bookCard/bookCard';
import Loading from '../Loading/Loading';
import { Book } from '@/app/admin/page';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Search from '../Search/Search';

interface Booksprop {
  books: Book[];
}

const BookList = ({ books }: Booksprop) => {
  const [search, setSearch] = useState(false);
  const router = useRouter();

  const bookVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className='relative'>
      <div className="w-full flex justify-end h-[50px] items-center text-white pr-6 absolute top-2">
        <span
          className='bg-red-400 w-[100px] cursor-pointer h-full text-center flex justify-center items-center rounded'
          onClick={() => router.push("/library/addbook")}
        >
          Lend
        </span>
      </div>
      {books && books.length > 0 ? (
        <div>
          <h1 className='font-serif text-[2rem] ml-8 font-bold text-red-950 p-5 flex gap-5'>
            Browse through our extensive Library
            <div
              className='h-[50px] w-[50px] rounded-full bg-gray-300 flex justify-center cursor-pointer items-center transition-all hover:scale-110 relative z-20'
              onClick={() => setSearch(!search)}
            >
              <SearchIcon />
            </div>
          </h1>
          {search && <Search />}
          <div className="w-full flex justify-center items-start gap-[10px] mt-[5px]">
            <div className='grid grid-cols-4 gap-1.5'>
              {books.map((book: Book, index) => (
                <motion.div
                  key={book._id}
                  variants={bookVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <BookCard data={book} />
                </motion.div>
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
