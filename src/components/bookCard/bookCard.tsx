import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface res_el {
  _id: string;
  name: string;
  url: string;
  author: string;
}

function BookCard({ data }:{data: res_el}) {
  return (
    <div className='w-[100%] h-[200px] flex justify-center items-center shadow-xl'>
      <div className="w-[60%] h-[95%] flex justify-center items-center border-solid border-2 p-2">
        <Image className="w-full h-full rounded-md object-cover" src={data.url} alt="" height={500} width={500}/>
      </div>
      <div className='flex w-full h-full justify-center items-center flex-col'>
        <h2 className='text-bold'>{data.name}</h2>
        <h3 className='text-sm'>{data.author}</h3>
        <Link href={`/library/${data._id}`}><button className='w-40 border-red-700 border-solid text-red-700 border-2 p-1 mt-4 rounded-md'>Rent</button></Link>
      </div>
    </div>
  )
}

export default BookCard
