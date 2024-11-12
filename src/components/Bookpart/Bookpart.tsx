"use client";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { Book } from "@/app/admin/page";
import Search from "../Search/Search";
import Link from "next/link";
import { BookCardComponent } from "../book-card";

interface Booksprop {
  books: Book[];
}

const BookList = ({ books }: Booksprop) => {
  const [search, setSearch] = useState(false);

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
    <div className="w-full mx-auto py-10 ">
      {books && books.length > 0 ? (
        <div className="max-w-6xl mx-auto relative">
          <Link
            className="cursor-pointer text-center flex justify-center items-center rounded-full bg-[#203e76] hover:bg-[#2a4b8d] px-6 py-2 absolute top-2 right-0 text-white"
            href="/library/addbook"
          >
            Lend
          </Link>
          <div className="flex gap-6 mt-5 mb-8">
            <h1 className="text-3xl font-semibold">
              Browse through our extensive Library
            </h1>

            <div
              className="h-[50px] w-[50px] rounded-full bg-gray-300 flex justify-center cursor-pointer items-center transition-all hover:scale-110 relative z-20"
              onClick={() => setSearch(!search)}
            >
              <SearchIcon />
            </div>
          </div>
          {search && <Search />}
          <div className="w-full ">
            <div className="grid grid-cols-4 w-full gap-y-10">
              {books.map((book: Book, index) => (
                <div className="justify-self-center shadow-md rounded-xl">
                  <BookCardComponent
                    id={book._id}
                    key={index}
                    author={book.author}
                    coverImage={book.url}
                    lender={book.username}
                    price={book.price}
                    title={book.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-[50px] text-bold">No Books Available</div>
      )}
    </div>
  );
};

export default BookList;
