"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface Review {
  rating: number;
  reviewText: string;
  userId: { username: string };
  createdAt: string;
}

interface NewReview {
  rating: number;
  reviewText: string;
  username: string;
}

const ReviewComponent = ({bookId}: {bookId: string}) => {
  const { user, isSignedIn } = useUser();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<NewReview>({
    rating: 1,
    reviewText: "",
    username: user?.username || "",
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/addReview/${bookId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();
        if (result.status) {
          setReviews(result.reviews);
        } else {
          console.error('Failed to add review:', result.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBooks();
  }, [bookId]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { rating, reviewText, username } = newReview;

    try {
      const response = await fetch(`http://localhost:3000/api/addReview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, rating, reviewText, bookId }),
      });

      const result = await response.json();
      if (result.status) {
        // console.log('Review added successfully:', result.review);
        alert("Review added successfully");
        result.review.userId = {
          id: result.review.userId,
          username: user?.username
        };
        setReviews((prevReviews) => [result.review, ...prevReviews]);
        setNewReview({ rating: 1, reviewText: "", username: user?.username || "" });
      } else {
        console.error('Failed to add review:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Leave a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating Input */}
        <label className="block">
          <span className="text-gray-700 font-medium">Rating:</span>
          <select
            name="rating"
            value={newReview.rating}
            onChange={handleInputChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          >
            <option value={1}>⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
          </select>
        </label>

        {/* Review Text */}
        <textarea
          name="reviewText"
          placeholder="Your review"
          value={newReview.reviewText}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          type="submit"
          className="w-full bg-pink-500 text-white p-3 rounded-md font-medium hover:bg-pink-600 transition duration-300"
        >
          Submit Review
        </button>
      </form>

      <h3 className="text-xl font-semibold text-blue-950 mt-8 mb-4">Reviews</h3>
      <ul className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <li key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">
                  {review?.userId.username || "Anonymous"}
                </span>
                <span className="text-yellow-500 font-semibold">
                  {review?.rating} Star{review?.rating > 1 ? "s" : ""}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-2">{review.reviewText}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
            </li>
          ))
        ) : (
          <div className="text-gray-500">No Reviews available for this book 🤔</div>
        )}
      </ul>
    </div>
  );
};

export default ReviewComponent;
