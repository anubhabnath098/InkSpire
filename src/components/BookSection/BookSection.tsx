import Image from 'next/image'
import React from 'react'

function BookSection() {
  return (
    <div className='flex flex-col justify-center items-center h-[400px] w-full gap-[15px]'>
        <div className=''>
            <h1 className='font-bold text-[2rem]'>Popular Picks</h1>
        </div>
        <div className="flex gap-[25px]">
            <Image className="p-2 border-solid border-2" src="/kafka1.jpg" alt="" height={200} width={200}/>
            <Image className="p-2 border-solid border-2" src="/jb.jpg" alt="" height={200} width={200}/>
            <Image className="p-2 border-solid border-2" src="/rdpd.jpg" alt="" height={200} width={200}/>
            <Image className="p-2 border-solid border-2" src="/rb.jpg" alt="" height={200} width={200}/>
        </div>
    </div>
    
  )
}

export default BookSection
