import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(req,res){
    try{
        const prisma = new PrismaClient()
        const result = await prisma.users.findMany()

        const usersWithoutPassword = result.map(({password, ...rest}) => rest)

        return NextResponse.json({status:"success",data:usersWithoutPassword})
    }catch(err){
        return NextResponse.json({status:"failed",data:err.toString()})
    }
}