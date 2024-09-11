import React from 'react'
import BookCard from '../bookCard/bookCard'
import Image from 'next/image'
import { bookdata } from '@/dummydata'
function Bookpart() {
  return (
    <>
    <h1 className='font-serif text-[2rem] ml-8 font-bold text-red-950'>Popular Picks</h1>
    <div className="w-[95%] flex justify-center items-start gap-[10px] mt-[5px]">
        <div className='flex justify-center items-center p-2 flex-col'>
            
            <Image className="rounded-md object-cover" alt="" src={bookdata[0].url} height={450} width={450}/>
        </div>
        <div className='grid grid-cols-3 gap-1'>
            {bookdata&&(bookdata.map((data,index)=>(
              <BookCard key={index} data={data}/>
            )))}
            
        </div>
    </div>
    </>
  )
}

export default Bookpart
