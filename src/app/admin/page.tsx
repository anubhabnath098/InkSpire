import { User } from '@/server/models/usermodels';
import { auth, currentUser } from '@clerk/nextjs/server';
import React from 'react'
import {connectToDB} from '@/server/connectToDB'

async function page () {
    const { userId } = auth()
    const user = await currentUser()
    connectToDB()
    const olduser = await User.findOne({email:user?.emailAddresses[0].emailAddress});
    let check=false
    if(olduser?.admin){
        
        check = true;
    }
    console.log("Hello",olduser);
  return (
    <div>
      {check?(<h1 className='w-full h-screen flex items-center justify-center text-red-950 text-5xl'>Welcome Admin, {olduser.username}</h1>):(<h1 className='w-full h-screen flex items-center justify-center text-red-950 text-5xl'>You are Not an Admin, Access Denied</h1>)}
    </div>
  )
}

export default page
