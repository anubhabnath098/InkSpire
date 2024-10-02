import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className=" h-300 w-full flex bg-red-300 items-center justify-center">
      <div className="p-5 flex flex-col items-center gap-2">
        <h1  className='text-6xl font-serif text-red-950'>Your Gateway to Infinite Worlds!</h1>
        <p className="w-2/3 mt-10">Welcome to InkSpire, where your literary adventures begin! Dive into a vast collection of books, from timeless classics to the latest bestsellers</p>
        <Link href="/library"><button className="w-40 h-12 border-red-950 border-solid text-white border-2 p-1 mt-4 rounded-md bg-red-950  hover:bg-transparent hover:text-red-950 hover:border-red-950 transition-all">Explore</button></Link>
      </div>
      <div>
        <Image src="/books.png" alt="" height={500} width={500}/>
      </div>
      
    </div>
  )
}

export default Header
