import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = async (req,res,next) => {
    // const token = req.cookies.access_token
    const token = req.body.token //sending manually
    if(!token){
        return next(createError(401,"Unauthenticated User!"));
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err){
            return next(createError(403,"Token is not valid!"));
        }
        req.user = user; //assigning user id for further applications
        next(); //continues from where we left 
    })
}