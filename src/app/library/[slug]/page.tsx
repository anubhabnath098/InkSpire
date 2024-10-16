// src/app/library/[slug]/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import './bookDetails.css';
import Loading from '@/components/Loading/Loading';
import axios from 'axios';

interface res_el {
  _id: string;
  name: string;
  url: string;
  author: string;
  description: string;
  price: number;
  isbn: string;
  username:string
}

function Page() {

  const router = useRouter();
  const [input, setInput] = useState(false);
  const [duration,setDuration] = useState(0);
  const [book, setBook] = useState<res_el | null>(null);
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const slugString = Array.isArray(slug) ? slug[0] : slug;

  useEffect(()=>{
    const getBook = async()=>{
      try{
        const response = await axios.get(`http://localhost:3000/api/search/${slugString}`);
        console.log(response);
        if(response.data.book)
          setBook(response.data.book);
        else{
          alert("message: "+response.data.message);
        }
      }
      catch(err){
        alert("An Error occured while fetching book: "+ err);
      }
      finally {
        setLoading(false);
      }
    }
    getBook();
  },[slugString]);

  const handleRent=async()=>{
    if(input){
      try{
        const response = await axios.post(`http://localhost:3000/api/rent/${slugString}`,{
        username:localStorage.getItem('username'),
        duration:duration
      })
      if(response.data.status===true){
        router.push("/orders");
      }
      else{
        setInput(false);
        alert(response.data.message);
      }
    }catch(err){
      setInput(false);
      alert("Issue. Try again later")
    }
    }
    else{
      setInput(true);
    }
  }

  const handleCart=async()=>{
    try{
      const response = await axios.post(`http://localhost:3000/api/addtocart/${slugString}`,{
      username:localStorage.getItem('username'),
    })
    if(response.data.status===true){
      router.push("/cart");
    }
    else{
      setInput(false);
      alert(response.data.message);
    }
  }catch(err){
    setInput(false);
    alert("Issue. Try again later")
  }
  }
  


  if (loading) {
    return <Loading/>;
  }

  if (!book) {
    return <div>No Book Found</div>;
  }

  return (
    <div className='productDisplay'>
      <div className="pd-left">
      <div className="pd-img-list">
        <img src={book.url} alt={book.name} />
        <img src={book.url} alt={book.name} />
        <img src={book.url} alt={book.name} />
        <img src={book.url} alt={book.name} />
      </div>

        <div className="pd-img">
          <img className='pd-main-img' src={book.url} alt={book.name} />
        </div>
      </div>
      <div className="pd-right">
        <span><h1>{book.name}</h1></span>
        <div className="flex flex-col">
          <span className='author_name text-xl'>{book.author}</span>
          <span className="text-sm text-red-950">{"(Lended by "+book.username+")"}</span>
        </div>
        
        
        <div className="pd-right-star">
          <div className='rating'>(Rating by Inkspire)</div>
          <img src="/star_icon.png" alt="" />
          <img src="/star_icon.png" alt="" />
          <img src="/star_icon.png" alt="" />
          <img src="/star_icon.png" alt="" />
          <img src="/star_icon.png" alt="" />
        </div>

        <div className="pd-right-prices">
          <div className="pd-right-price-new">
            {book.price}
          </div>
        </div>

        <div className="pd-right-description">
            {book.description}
        </div>
      <div className="flex gap-4">
      <span className='add_to_cart'>
          <button onClick={handleCart}>Add to Cart</button>
        </span>
        <span className='rent_now flex items-center'>
        {input&&(<div>Duration <input className='h-[40px] w-[70px] p-3 rounded' type="number" value={duration} onChange={e=>setDuration(parseInt(e.target.value))} placeholder='Enter Duration'/></div>)}<button onClick={handleRent}>Rent Now</button>
        </span>
      </div>
        

        <p className='pd-right-category'><span>Category: </span>Fiction and Literature</p>
        <p className='pd-right-category'><span>Tags: </span>Mystery, Romance</p>
        <p className='pd-right-category'><span>ISBN Number: </span>{book.isbn}</p>
      </div>
    </div>
  );
}

export default Page;
