"use client";

import React, { useEffect, useState } from 'react';
import BookCard from '../bookCard/bookCard';
import Image from 'next/image';
import Loading from '../Loading/Loading'
import { Book } from '@/app/admin/page';
const SearchBook = ({books}:any) => {
    const [cancel, setCancel] = useState(false);

  return (
    <div>
      {cancel==false&&books && books.length  > 0 ? (
        <div>
          <div className="w-[100%] flex justify-center items-start gap-[10px] mt-[5px]">
            <div className='grid grid-cols-3 gap-1.5'>
              {books.map((book:Book) => (
                <BookCard key={book._id} data={book} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='text-[50px] text-bold'></div>
      )}
    </div>
  );
};

export default SearchBook;