"use client"
import { Description } from '@mui/icons-material';
import axios from 'axios';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

function Page() {
    const router = useRouter();
    const [book, setBook] = useState({
        name: "",
        url: '',
        author: '',
        description: '',
        price: 0,
        isbn: '',
        username:''
    });

    // Handle text input changes
    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setBook(prevBook => ({
            ...prevBook,
            [name]: value
        }));
    }

    const handleFileChange = (e:any) => {
        const file = e.target.files[0];
        setBook(prevBook => ({
            ...prevBook,
            url: "/"+file.name
        }));
    }

    const handleClick = async() => {
        const response = await axios.post("http://localhost:3000/api/add",{
            name:book.name,
            url:book.url,
            author:book.author,
            description:book.description,
            price:book.price,
            isbn:book.isbn,
            username:localStorage.getItem('username')
        })
        if(response.data.status===false){
            console.log(response);
            alert("Message: "+(response.data?response.data.message:"Internal Server Error"));
        }
        else{
            router.push("/library");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 border-2 border-red-950 rounded-lg w-full max-w-xl">
                <div className="mb-4">
                    <label className="block text-red-950 font-semibold mb-2">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={book.name}
                        onChange={handleChange}
                        className="border-2 border-red-950 p-2 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-red-950 font-semibold mb-2">URL:</label>
                    <input
                        type="file"
                        name="url"
                        onChange={handleFileChange}
                        className="border-2 border-red-950 p-2 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-red-950 font-semibold mb-2">Author:</label>
                    <input
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        className="border-2 border-red-950 p-2 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-red-950 font-semibold mb-2">Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={book.description}
                        onChange={handleChange}
                        className="border-2 border-red-950 p-2 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-red-950 font-semibold mb-2">Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={book.price}
                        onChange={handleChange}
                        className="border-2 border-red-950 p-2 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-red-950 font-semibold mb-2">ISBN:</label>
                    <input
                        type="text"
                        name="isbn"
                        value={book.isbn}
                        onChange={handleChange}
                        className="border-2 border-red-950 p-2 rounded w-full"
                    />
                </div>
                <button
                    onClick={handleClick}
                    className="bg-red-400 text-white font-bold p-2 rounded w-full hover:bg-red-950 hover:text-red-400 transition duration-300"
                >
                    Submit
                </button>
            </div>
        </div>
    );
    
    
}

export default Page;
