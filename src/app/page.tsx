import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import Book from "@/components/Book/Book";
import Image from "next/image";
import Search from "@/components/Search/Search";
import BookSection from "@/components/BookSection/BookSection";

export default async function Home() {

  //console.log(user.username)
  return (
    <div className="bg-white">
      <Header/>
      <Search/>
      <BookSection/>
      <Book/>
    </div>
    
  );
}
