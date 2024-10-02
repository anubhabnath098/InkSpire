import { NextRequest, NextResponse } from 'next/server';
import connectToDB from "@/server/connectToDB";
import Books from '@/server/models/bookmodels';
import Rent from '@/server/models/rentmodels';
import { User } from '@/server/models/usermodels';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const {id} = params;
        let body;
        try {
            body = await req.json();
        } catch (parseError) {
            return NextResponse.json(
                { message: "Invalid JSON in request body", status: false },
                { status: 400 }
            );
        }
        
        const {username, duration} = body;

        if (!username || !duration) {
            return NextResponse.json(
                { message: "Username/duration is required", status: false }, 
                { status: 400 }
            );
        }   

        await connectToDB();
        const user = await User.findOne({ username });
        
        if (!user) {
            return NextResponse.json(
                { message: "User not found", status: false },
                { status: 404 }
            );
        }
        const book = await Books.findById(id);
        if(book){
            const rentedBook = await new Rent({ username, book, duration, isReturned:false });
            rentedBook.save();
            return NextResponse.json({
                book: rentedBook,
                message: "Successfully retrieved rented books",
                status: true
            }, {
                status: 200
            });
        }
        else{
            return NextResponse.json({
                message: "Some error occured while renting",
                status: true
            }, {
                status: 400
            });
        }
            
    } catch (error) {
        console.error('Error :', error);
        return NextResponse.json(
            { message: "Internal Server Error", status: false }, 
            { status: 500 }
        );
    }
}