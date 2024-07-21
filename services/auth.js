import { name } from "ejs";
import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();

const secret= process.env.SECRET;

function createtoken(user){
    const payload= {
        _id:user._id,
        email: user.email
        // profileimage:user.profileimage
    };
    const token = jwt.sign(payload,secret)
    return token;
}

function validatetoken(token){
    const payload = jwt.verify(token,secret);
    return payload; 
}


export {createtoken,validatetoken}