import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

// console.log(process.env.MONGODB_URI);

export function mongooseConnect(){
    if(mongoose.connection.readyState === 1){
        return mongoose.connection.asPromise();
    }else{
        const uri:string = process.env.MONGODB_URI as string;
        return mongoose.connect(uri);
    }
}