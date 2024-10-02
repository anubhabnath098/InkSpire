import Footer from '@/components/footer/Footer'
import React from 'react'

function page() {
  return (
    <>
      <main className="h-screen w-full bg-red-300 flex flex-col gap-2 items-centre relative top-[50px]">
      <div className="w-3/4 bg-white p-4 mx-auto mt-12 h-[410px] shadow-lg rounded-md">
        <h1 className="text-3xl font-medium">Shopping Cart</h1>
        <p className="text-sm text-zinc-600 text-right">Price</p>
        <div className="h-[1px] bg-zinc-300 w-full" />
        <div className="flex my-4 gap-4">
          <img
            src="https://m.media-amazon.com/images/I/51pdwNbBDML._SL1024_.jpg"
            className="h-[200px] bg-zinc-300"
          />
          <div className="flex flex-col gap-4">
            <h2>
              Street27® 3pcs Astronaut Figurine Home Decor Astronaut Statue
              Study Office Desk Decor Showpiece Gift Decoration Accessories
              Outer Space PVC Sculpture (Golden)
            </h2>
            <p className="text-red-600 font-medium">Limited time deal</p>
            <p>$59.00</p>
            <div className="flex">
              <div className="px-2 border-l-2 border-zinc-300">
                <a href="#" className="text-blue-500 text-sm ">
                  Delete
                </a>
              </div>
              <div className="px-2 border-x-2 border-zinc-300">
                <a href="#" className="text-blue-500 text-sm ">
                  Share
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-zinc-300 w-full" />
        <h2 className="text-right text-lg font-medium my-3">
          Subtotal: $59.00
        </h2>
        <div className="flex justify-end">
          <button className="px-6 text-sm py-2 bg-yellow-500 rounded-full justify-right justify-self-end">
            Proceed to Buy
          </button>
        </div>
      </div>
    </main>
    <Footer/>
    </>
  )
}

export default page
