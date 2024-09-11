"use client"
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const page = () => {
  // State to hold form data
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isbnNumber, setIsbnNumber] = useState('');
  const [bookImages, setBookImages] = useState<File[]>([]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log({ bookName, authorName, description, price, isbnNumber, bookImages });
    // alert('Book details submitted successfully!');
  };

  // Handle file drop
  const onDrop = (acceptedFiles: File[]) => {
    setBookImages((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  // Set up react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
  });

  return (
    <div className='bg-gray-100'>
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Upload Book Details</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Book Name */}
        <div className="flex flex-col">
          <label htmlFor="bookName" className="mb-2 font-medium text-gray-700">
            Book Name
          </label>
          <input
            type="text"
            id="bookName"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Enter the book name"
          />
        </div>

        {/* Author Name */}
        <div className="flex flex-col">
          <label htmlFor="authorName" className="mb-2 font-medium text-gray-700">
            Author Name
          </label>
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Enter the author name"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="description" className="mb-2 font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Add more details about the book..."
            rows={4}
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label htmlFor="price" className="mb-2 font-medium text-gray-700">
            Tentative Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Enter the price you want"
          />
        </div>

        {/* ISBN Number */}
        <div className="flex flex-col">
          <label htmlFor="isbnNumber" className="mb-2 font-medium text-gray-700">
            ISBN Number
          </label>
          <input
            type="text"
            id="isbnNumber"
            value={isbnNumber}
            onChange={(e) => setIsbnNumber(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Enter the ISBN number"
          />
        </div>

        {/* Drag-and-Drop File Upload */}
        <div className="md:col-span-2">
          <label htmlFor="bookImages" className="mb-2 font-medium text-gray-700">
            Upload Book Photos
          </label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed p-6 rounded-lg text-center cursor-pointer focus:outline-none ${
              isDragActive ? 'border-red-400 bg-red-50' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-gray-600">Drop the files here...</p>
            ) : (
              <p className="text-gray-600">
                Drag and drop some files here, or click to select files
              </p>
            )}
          </div>
          {/* Display uploaded files */}
          <ul className="mt-4">
            {bookImages.map((file, index) => (
              <li key={index} className="text-sm text-gray-500">
                {file.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="w-full md:w-1/2 bg-red-600 text-white py-3 rounded-lg hover:bg-red-500 transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default page;
