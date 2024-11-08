import Book from "@/components/Book/Book";
import Image from "next/image";
import Search from "@/components/Search/Search";
import BookSection from "@/components/BookSection/BookSection";
import Footer from "@/components/footer/Footer";
import InfiniteScroll from "@/components/infiniteScroll/infiniteScroll";
import Header from "@/components/Header/Header";

export default async function Home() {
  return (
    <div className="bg-white">
      <Header />
      <InfiniteScroll />
      <Search />
      <BookSection />
      <Book />

      <div className="w-full flex justify-center py-8">
        <div className="max-w-full lg:max-w-4xl text-center">
          <h2 className="text-[30px] font-bold text-red-800 mb-4">
            Watch This for a Full Tour
          </h2>
          
          <video
            className="w-full rounded-xl shadow-2xl"
            controls
            loop
            muted
            src="/recording.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
