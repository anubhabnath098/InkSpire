import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
    // description:{
    //     type:String,
    //     required:true
    // },
    // price:{
    //     type:Number,
    //     required:true
    // },
    // isbn:{
    //     type:String,
    //     required:true
    // }
});


const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);
export default Book;