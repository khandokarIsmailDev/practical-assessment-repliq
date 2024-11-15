import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req,res){
    try{
        const reqBody = await req.json()
        reqBody.otp = "0"
        const prisma = new PrismaClient()

        //check if user already exists
        const userExists = await prisma.users.findUnique({
            where:{email:reqBody.email}
        })
        if(userExists){
            return NextResponse.json({status:"failed",error:"User already exists"})
        }

        const result = await prisma.users.create({
            data:reqBody
        })
        return NextResponse.json({status:"success",data:result})
    }catch(err){
        return NextResponse.json({status:"failed",data:err.toString()})
    }
}