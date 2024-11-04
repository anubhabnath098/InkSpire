"use client"
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar/Navbar'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import authenticate from '@/server/action'; // Update with your actual path

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  useEffect(() => {
    const checkUser = async () => {
      await authenticate();
    };
    checkUser();
  }, []);

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="flex">
            <Navbar />
          </div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
