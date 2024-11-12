"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, ShoppingCart } from "lucide-react";
import { PersonIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Book {
  _id: string;
  name: string;
  author: string;
  url: string;
  description: string;
  price: number;
  isbn: string;
  username: string;
}

interface CartBook {
  _id: string;
  username: string;
  book: Book;
}

export function CartPageComponent({ cartbooks }: { cartbooks: CartBook[] }) {
  const router = useRouter();
  const [books, setBooks] = useState(cartbooks);
  const handleDelete = async (id: string, index: number) => {
    try {
      const updatedBooks = books.filter((_, i) => i !== index);
      setBooks(updatedBooks);
      const response = await axios.delete(
        `http://localhost:3000/api/addtocart/${id}`
      );
      if (!response.data) {
        throw new Error("Failed to delete item from cart");
      }
      console.log("Deleted item successfully");
    } catch (err) {
      throw err;
    }
  };

  // const handleRent = async (id: string, cartId: string, price: number) => {
  //   try {
  //     router.push(
  //       `http://localhost:3000/payment?username=${user?.username}&amount=${(
  //         duration * price
  //       ).toString()}&bookId=${id}&duration=${duration.toString()}`
  //     );
  //     setInput(false);
  //   } catch (err) {
  //     setInput(false);
  //     alert("Issue. Try again later");
  //   }
  // };

  const subtotal = books.reduce((sum, item) => sum + item.book.price, 0);

  return (
    <div className="container mx-auto pt-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ScrollArea className="h-[calc(100vh-200px)]">
            {books.map((item, index) => (
              <Card key={item._id} className="mb-4">
                <CardContent className="p-4 flex items-center space-x-4">
                  <Image
                    src={item.book.url}
                    alt={`Cover of ${item.book.name}`}
                    width={80}
                    height={120}
                    className="rounded-md"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.book.name}</h3>
                    <p className="text-sm text-gray-600">{item.book.author}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <PersonIcon className="w-3 h-3 mr-1" />
                      <span>Lent by {item.username}</span>
                    </div>
                    <p className="font-bold mb-2">
                      ${item.book.price.toFixed(2)}/day
                    </p>
                    <div className="flex items-center gap-3">
                      <p>duration</p>
                      <input
                        className="h-2 w-14 p-3 rounded-md border-1 bg-neutral-200 border-neutral-600"
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      ${item.book.price.toFixed(2)}/day
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 mt-2"
                      onClick={() => handleDelete(item._id, index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </div>
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  ${subtotal.toFixed(2)}/week
                </span>
              </div>
              <Button className="w-full bg-pink-500 hover:bg-pink-600">
                <ShoppingCart className="mr-2 h-4 w-4" /> Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
