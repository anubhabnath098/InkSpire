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
        <div className="w-full lg:max-w-6xl text-center">
          <h2 className="text-[30px] font-bold text-red-800 mb-4">
            Watch This for a Full Tour
          </h2>

          <div className="w-full relative" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-xl shadow-2xl"
              src="https://www.youtube.com/embed/8mOb9cRjykM"
              title="Full Tour Video"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
