"use client"
import Bookpart from '@/components/Bookpart/Bookpart'
import Loading from '@/components/Loading/Loading';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export interface res_el {
  _id: string;
  name: string;
  url: string;
  author: string;
  description: string;
  price: number;
  isbn: string;
  username:string
}
function page() {

  const router = useRouter();
  
  const [books, setBooks] = useState<Array<res_el| null>>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/allbooks");
        if (response.data.status === false) {
        } else {
          setBooks(response.data.books || []);
        }
      } catch (err) {
        console.error(err);
      }
      finally{
        setLoading(false);
      }
    };

    getBooks();
  }, []);


  if(loading){
    return (<Loading/>);
  }


  return (
    <div className='flex flex-col w-full'>
      <div className="w-full flex justify-end border-2 h-[50px] items-center text-white border-white pr-6" ><span className='bg-red-400 w-[100px] cursor-pointer h-full text-center flex justify-center items-center rounded' onClick={e=>router.push("/library/addbook")}>Rent</span></div>
      <Bookpart books={books}/>
    </div>
  )
}

export default page
