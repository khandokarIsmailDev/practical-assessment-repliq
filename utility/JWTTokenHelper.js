
import {jwtVerify, SignJWT} from "jose";  
  
  
export async function CreateToken(email,id){  
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)   //jose package theke astese  
    const Payload = {email:email,id:id}       // email and id ta object akare rekhe dilam, pore sobida moto use korte parbo  
    let token = await new SignJWT(Payload)                                  // token k encode korlam  
        .setProtectedHeader({alg:'HS256'})                      //Algorithm bole dilam, jwt provide kore ai algorithm  
        .setIssuedAt()                                         // aita kokhon create kora hosse,  
        .setIssuer(process.env.JWT_ISSUER)  
        .setExpirationTime(process.env.JWT_EXPIRATION_TIME)  
        .sign(secret)  
    return token  
}  
  
  
export async function VerifyToken(token){  
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)  
    const decoded = await jwtVerify(token,secret)  
    return decoded['payload']  
}  