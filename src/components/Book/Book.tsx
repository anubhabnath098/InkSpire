import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
function Book() {
  return (
    <div className='flex h-[350px] w-full justify-center gap-5 mt-5'>
    <div className="flex w-[45%] h-[85%] border-solid border-2 border-red-300 justify-center items-center gap-5 rounded-md">
      <Image src="/4set.jpg" alt="" height={170} width={170}></Image>
      <div className='flex flex-col'>
        <h2>Rent from a wide range of collections</h2>
        <Link href="/library"><button className="w-40 border-red-700 border-solid text-red-700 border-2 p-1 mt-4 rounded-md">Rent a book</button></Link>
      </div>
      
    </div>
    <div className="flex w-[45%] h-[85%] border-solid border-2 border-red-300 justify-center items-center gap-5 rounded-md">
    <Image src="/got.webp" alt="" height={250} width={250}></Image>
    <div className='flex flex-col'>
        <h2>Earn Money by Lending books to people</h2>
        <Link href="/library/addbook"><button className='w-40 border-red-700 border-solid text-red-700 border-2 p-1 mt-4 rounded-md'>Lend a book</button></Link>
    </div>
    

  </div>
  </div>
  )
}

export default Book
