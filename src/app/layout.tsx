"use server"
import Navbar from '@/components/Navbar/Navbar'
import { auth, currentUser } from '@clerk/nextjs/server'
import {
  ClerkProvider,
  SignIn,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import './globals.css'
import { connectToDB } from '@/server/connectToDB'
import { User } from '@/server/models/usermodels'
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()
  const user = await currentUser()
  connectToDB();
  if(user){
    let Newuser:any = await User.find({email:user.emailAddresses[0].emailAddress});
    //console.log(Newuser);
    if(Newuser.length==0){
      Newuser = new User({
        clerkId:user.id,
        username:user.username,
        email:user.emailAddresses[0].emailAddress,
        admin:false
      })
      console.log(Newuser);
      Newuser.save();
    }
  }
  return (
    // <ClerkProvider>
      <html lang="en">
        <body>
            <ClerkProvider><div className="flex"><Navbar user={user}/></div>{children}</ClerkProvider>
        </body>
      </html>
    
  )
}
