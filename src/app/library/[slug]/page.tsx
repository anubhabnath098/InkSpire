"use client"
import React from 'react'
import './bookDetails.css'
import { useParams } from 'next/navigation'
import { bookdata } from '@/dummydata';

function page() {
    const {slug} = useParams();
    const book = bookdata.filter(book=>{
        return book.id===slug;
    })
  return (
    <>
    <div className='productDisplay'>
        <div className="pd-left">
            <div className="pd-img-list">
                <img src={book[0].url} alt="" />
                <img src={book[0].url} alt="" />
                <img src={book[0].url} alt="" />
                <img src={book[0].url} alt="" />
            </div>
            <div className="pd-img">
                <img  className='pd-main-img' src={book[0].url} alt="" />
            </div>
        </div>
        <div className="pd-right">
            <span><h1>{book[0].name} </h1></span>
            <span className='author_name'>{book[0].author}</span>

            
            <div className="pd-right-star">
                <div className='rating'>(Rating by Inkspire)</div>
                <img src="/star_icon.png" alt="" />
                <img src="/star_icon.png" alt="" />
                <img src="/star_icon.png" alt="" />
                <img src="/star_icon.png" alt="" />
                <img src="/star_icon.png" alt="" />
            </div>

            <div className="pd-right-prices">
                <div className="pd-right-price-old">
                    $300
                </div>
                <div className="pd-right-price-new">
                    $250
                </div>
            </div>
            <div className="pd-right-description">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus, voluptas fuga? Accusantium, quos quae facere odit consectetur, nostrum aliquid laudantium sunt exercitationem officiis corrupti? Cum et sequi, modi tempore nisi voluptates ex blanditiis nostrum fugit commodi voluptatibus quibusdam ab soluta vitae dignissimos impedit similique quae cupiditate iusto. Atque, ducimus ad.
            </div>

            <span className='add_to_cart'><button onClick={()=>{console.log("product added to cart")}} >Add to Cart</button></span>
            <span className='rent_now'><button onClick={()=>{console.log("Rent Now Clicked")}} >Rent Now</button></span>

            <p className='pd-right-category'><span>Category: </span>Fiction and Literature</p>
            <p className='pd-right-category'><span>Tags: </span>Mystery, Romance</p>
            <p className='pd-right-category'><span>ISBN Number: </span>875673982</p>

        </div>
    </div>
    </>
  )
}

export default page
