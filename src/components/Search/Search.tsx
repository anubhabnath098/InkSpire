"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SearchBook from '../searchBook/SearchBook';

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
  const [result, setResult] = useState<Array<res_el | null>>([])
  const [error, setError] = useState('');

  useEffect(()=>{
    const handleSearch = async () => {
      try {
        //console.log(bookname, authorname);
        const response = await axios.post('/api/search', {
          name: bookname,
          author: authorname
        });
    
        console.log(response);
    
        if (response.data.message === 'No books found') {
          setResult([]);
          setError('Book Not Available');
        } else {
          setResult(response.data.books);
          setError('');
        }
      } catch (err) {
        console.error(err);
        setError('Error searching for book');
      }
    };
    handleSearch()
  },[bookname, authorname])
  
  

  return (
    <>
    <div className="flex w-[100%] h-[100px] items-center justify-center gap-[20px]">
        <input className="border-[3px] border-solid p-2 border-gray-400 rounded-md w-[30%]" 
        type="text" 
        placeholder="book title" 
        value={bookname}
        onChange={(e) => setBookname(e.target.value)}
        />
        <input className="border-[3px] border-solid p-2  border-gray-400 rounded-md w-[30%]" 
        type="text" 
        placeholder="book author"
        value={authorname}
        onChange={(e) => setAuthorname(e.target.value)}
        />
    </div>
    <div>
      {error==''&&result && (
      <div>
        <SearchBook books={result}/>
      </div>
      )} 
    </div>
    <div>
      {error && <div className='w-full h-[50px] flex justify-center items-center'><span className='w-[20%] h-full text-bold text-red-950 text-center'>{"No Book Found"}</span></div>}
    </div>
    </>
  )
}

export default Search;
