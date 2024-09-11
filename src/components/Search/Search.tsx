import React from 'react'

function Search() {
  return (
    <div className="flex w-[100%] h-[100px] items-center justify-center gap-[20px]">
        <input className="border-[3px] border-solid p-2 border-gray-400 rounded-md" type="text" placeholder="book title" />
        <input className="border-[3px] border-solid p-2  border-gray-400 rounded-md" type="text" placeholder="book category"/>
        <input className="border-[3px] border-solid p-2  border-gray-400 rounded-md" type="text" placeholder="book author"/>
        <button className="p-2 bg-red-700 rounded-md px-5 text-white">Search Book</button>
    </div>
  )
}

export default Search
