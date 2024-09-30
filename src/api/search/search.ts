import connectToDB from "@/server/connectToDB";
import Book from "@/server/models/bookmodels";

export default async function searchHandler(req, res, next) {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method Not Allowed", status: false });
  }

  const { name, author } = req.body;

  // Validate input
  if (!name && !author) {
    return res.status(400).json({ message: "Enter a search term", status: false });
  }

  try {
    // Ensure DB connection is awaited
    await connectToDB();

    // Perform search
    const books = await Book.find({
        $or: [
          { name: { $regex: name, $options: 'i' } },
          { author: { $regex: author, $options: 'i' } }
        ]
      });
      console.log(books);
      

    // Check if books were found
    if (books.length > 0) {
      return res.status(200).json({ books: books, status: true });
    } else {
      return res.status(404).json({ message: "No books found", status: false });
    }
  } catch (err) {
    // Handle errors properly
    return next(err);
  }
}
