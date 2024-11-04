"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
