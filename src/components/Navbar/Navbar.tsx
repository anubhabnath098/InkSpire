import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
function Navbar({user}) {
  return (
    <div className='flex  w-[95%] h-12 justify-between items-center mr-0'>
        <div className="font-bold text-red-700 w-full ml-5"><Link href="/">InkSpire</Link></div>
        <div className="flex w-full h-11 text-red-700 justify-evenly items-center">
            <Link href="/library"><div className="flex gap-1"><CollectionsBookmarkIcon/>Library</div></Link>
            <Link href="/orders"><div className="flex gap-1"><BookmarkBorderIcon/>Orders</div></Link>
            <Link href="/cart"><div className="flex gap-1"><ShoppingCartIcon/>Cart</div></Link>
            <Link href="/about"><div className="flex gap-1"><StoreIcon/>About</div></Link>
            {user?(<UserButton showName/>):(<Link href="/sign-in"><div className="flex gap-1"><AccountCircleIcon/>Sign in</div></Link>)}
        </div>
    </div>
    
  )
}

export default Navbar
