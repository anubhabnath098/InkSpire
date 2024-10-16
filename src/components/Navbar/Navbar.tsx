"use client"
import React, { useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Loading from '../Loading/Loading';
import { auth } from '@clerk/nextjs/server';
import { useRouter } from 'next/navigation';
// import CheckUser from '../checkuser/CheckUser';

function Navbar() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    const updateUserState = () => {
      try{
        if (isLoaded && isSignedIn && user) {
          console.log('User logged in:', user);
          localStorage.setItem('username', user.username!);
          setIsLoggedIn(true);
        } else {
          console.log('No user logged in');
          localStorage.removeItem('username');
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error('Error updating user state:', err);
      } finally {
        setLoading(false);
        router.refresh();
      }
    }

    updateUserState();
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded || loading) {
    return (<div className='w-full h-[50px]'></div>);
  }

  return (
    <div className='flex w-full h-12 justify-between items-center mr-0 fixed bg-white z-40'>
      <div className="font-bold text-red-700 w-full ml-5"><Link href="/">InkSpire</Link></div>
      <div className="flex w-full h-11 text-red-700 justify-evenly items-center">
        <Link href="/library"><div className="flex gap-1"><CollectionsBookmarkIcon/>Library</div></Link>
        <Link href="/orders"><div className="flex gap-1"><BookmarkBorderIcon/>Orders</div></Link>
        <Link href="/cart"><div className="flex gap-1"><ShoppingCartIcon/>Cart</div></Link>
        <Link href="/about"><div className="flex gap-1"><StoreIcon/>About</div></Link>
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Link href="/sign-in"><div className="flex gap-1"><AccountCircleIcon/>Sign in</div></Link>
        )}
      </div>
    </div>
  )
}

export default Navbar