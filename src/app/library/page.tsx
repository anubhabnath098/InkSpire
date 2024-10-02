"use client"
import Bookpart from '@/components/Bookpart/Bookpart'
import Footer from '@/components/footer/Footer';
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
    <div className='flex flex-col w-full relative top-[50px]'>
      <Bookpart books={books}/>
      <Footer/>
    </div>
  )
}

export default page
