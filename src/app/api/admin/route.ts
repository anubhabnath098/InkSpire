import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '@/server/connectToDB';
import { User } from '@/server/models/usermodels';

export async function POST(req: NextRequest) {
    try {
        let body = await req.json();
        const {username, password} = body;

        if (!username || !password) {
            return NextResponse.json(
                { message: "Username and password is required", status: false }, 
                { status: 400 }
            );
        }   

        await connectToDB();
        
        // Need to await the User.findOne() query
        const user = await User.findOne({ username });
        
        if (!user) {
            return NextResponse.json(
                { message: "User not found", status: false },
                { status: 404 }
            );
        }

        if(password===process.env.ADMIN_PASSWORD){
            const newUser = await User.findByIdAndUpdate(user._id, { admin:true });
            const userAfterUpdate = await User.findOne({_id:newUser._id});
            return NextResponse.json(
                { message : "Admin priviledges Granted", user:userAfterUpdate, status: true},
                { status: 200}
            )
        }
            
    } catch (error) {
        console.error('Error ', error);
        return NextResponse.json(
            { message: "Internal Server Error", status: false }, 
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        await connectToDB();

        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username');

        let query = {};

        if (username) {
            query = { username: { $ne: username } }; 
        }

        const users = await User.find(query);

        return NextResponse.json(
            { message: "Fetch successful", users, status: true },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error ', error);
        return NextResponse.json(
            { message: "Internal Server Error", status: false },
            { status: 500 }
        );
    }
}


