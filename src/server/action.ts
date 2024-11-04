"use server"
import connectToDB from "./connectToDB"
import { currentUser,auth } from "@clerk/nextjs/server";
import { User } from "./models/usermodels";

const authenticate = async () => {
    connectToDB();
    const user = await currentUser();

    if (!user) {
        auth().redirectToSignIn();
    } else {
        let Newuser: any = await User.find({ email: user.emailAddresses[0].emailAddress });
        if (Newuser.length === 0) {
            Newuser = new User({
                clerkId: user.id,
                username: user.username,
                email: user.emailAddresses[0].emailAddress,
                admin: false
            });
            await Newuser.save();
        }
    }
};

export default authenticate;
