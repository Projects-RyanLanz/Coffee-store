import { PrismaClient } from "@prisma/client";
import { userModel } from "../models/userModel";

const prisma = new PrismaClient()

export class UserRepository {

    //GET
    static async getAll(){
        return await prisma.user.findMany()
    }

    static async getId(id:number){
        return await prisma.user.findUnique({
            where:{
                id:id
            }
        })
    }

    //POST
    static async create(data:Omit<userModel,'id'>): Promise<userModel>{
        const newUser = await prisma.user.create({
            data,
        })
        return newUser as userModel
    }

    //DELETE
    static async delete(id:number){
        return await prisma.user.delete({
            where:{
                id:id
            }
        })
    }

    //PUT
    static async edit(data:Omit<userModel,'id'>,id:number) {
        const editUser = await prisma.user.update({
            data,
            where:{
                id:id
            }
        })
    }
}