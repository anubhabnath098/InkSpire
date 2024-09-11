import React from "react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-red-950 text-white flex flex-col items-center">
      {/* Hero Section with Image */}
      <div className="relative w-full h-96">
        <img
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
          alt="Bookshelf"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-red-950 to-transparent flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            About Inkspire
          </h1>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-4xl mx-auto p-8 bg-red-300 rounded-md shadow-lg transform transition duration-500 hover:scale-105 mt-10">
        <h2 className="text-4xl font-bold text-center text-red-950 mb-6">
          Our Mission
        </h2>
        <p className="text-lg text-red-700 mb-4">
          <span className="font-semibold">Inkspire</span> is more than just a
          book rental platform. We aim to inspire creativity and knowledge by
          providing easy access to literature from all over the world. Whether
          you're looking for the latest bestseller or timeless classics, our
          platform makes it easy for you to find and rent books.
        </p>
        <p className="text-lg text-red-700 mb-4">
          We are committed to promoting the joy of reading and connecting book
          lovers. Our carefully curated selection ensures that there's something
          for everyone.
        </p>
        <p className="text-lg text-red-700">
          Join us and fuel your imagination, one book at a time.
        </p>
      </div>

      {/* Features Section with Icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-4xl">
        <div className="flex flex-col items-center p-6 bg-red-300 rounded-md shadow-lg hover:bg-red-400 transition">
          <img
            src="https://img.icons8.com/fluent/96/000000/open-book.png"
            alt="Wide Selection"
            className="mb-4 w-24 h-24"
          />
          <h3 className="text-2xl font-bold text-red-950 mb-2">
            Wide Selection
          </h3>
          <p className="text-red-700 text-center">
            Thousands of books across various genres, handpicked to suit all
            tastes.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 bg-red-300 rounded-md shadow-lg hover:bg-red-400 transition">
          <img
            src="https://img.icons8.com/fluent/96/000000/handshake.png"
            alt="Community"
            className="mb-4 w-24 h-24"
          />
          <h3 className="text-2xl font-bold text-red-950 mb-2">
            Reader Community
          </h3>
          <p className="text-red-700 text-center">
            Join a community of book lovers who share your passion for reading.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 bg-red-300 rounded-md shadow-lg hover:bg-red-400 transition">
          <img
            src="https://img.icons8.com/fluent/96/000000/shipping.png"
            alt="Fast Delivery"
            className="mb-4 w-24 h-24"
          />
          <h3 className="text-2xl font-bold text-red-950 mb-2">
            Fast Delivery
          </h3>
          <p className="text-red-700 text-center">
            Get your books delivered right to your door, quickly and
            efficiently.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full mt-12 bg-red-700 text-center py-6">
        <p className="text-white">&copy; 2024 Inkspire. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
