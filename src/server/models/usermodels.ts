import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    clerkId:{
        type:String,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    admin: {
         type: Boolean, 
         default: false },

});

export const User = mongoose.models.User || mongoose.model('User',userSchema);