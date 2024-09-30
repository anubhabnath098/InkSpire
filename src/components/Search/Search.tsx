"use client"
import React, { useState } from 'react'
import axios from 'axios';

interface res_el {
  _id: string;
  name: string;
  url: string;
  author: string;
  description: string;
  price: number;
  isbn: string;
}

function Search() {
  const [bookname, setBookname] = useState('');
  const [authorname, setAuthorname] = useState('');
  const [result, setResult] = useState<res_el | null>(null)
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      console.log(bookname, authorname);
      const response = await axios.post('/api/search', {
        name: bookname,
        author: authorname
      });
  
      console.log(response);
  
      if (response.data.message === 'No books found') {
        setResult(null);
        setError('Book Not Available');
      } else {
        setResult(response.data.books);  // Assuming 'books' is the key holding the search result
        setError('');
      }
    } catch (err) {
      console.error(err);
      setError('Error searching for book');
    }
  
    // Reset form values
    setBookname('');
    setAuthorname('');
  };
  

  return (
    <>
    <div className="flex w-[100%] h-[100px] items-center justify-center gap-[20px]">
        <input className="border-[3px] border-solid p-2 border-gray-400 rounded-md" 
        type="text" 
        placeholder="book title" 
        value={bookname}
        onChange={(e) => setBookname(e.target.value)}
        />
        <input className="border-[3px] border-solid p-2  border-gray-400 rounded-md" 
        type="text" 
        placeholder="book author"
        value={authorname}
        onChange={(e) => setAuthorname(e.target.value)}
        />

        <button className="p-2 bg-red-700 rounded-md px-5 text-white"
        onClick={handleSearch}
        >Search Book
        </button>
    </div>
    <div>
      { result && (
      <div>
        <h3>Book Found:</h3>
        <p>Title: {result.name}</p>
        <p>Author: {result.author}</p>
      </div>
      )} 
    </div>
    <div>
      {error && <div>{error}</div>}
    </div>
    </>
  )
}

export default Search;
