import { Request,Response } from "express"; 
import { PrismaClient } from "@prisma/client";
import { orderModel } from "../models/orderModel";

const prisma = new PrismaClient()

export class orderRepository{

    //GET
    static async  getAll(){
        return await prisma.order.findMany()
    }

    static async getid(id:number){
        return await prisma.order.findUnique({
            where:{
                id:id
            }
        })
    }

    //POST 
    static async create(data:Omit<orderModel,'id'>): Promise<orderModel>{

        const userCheck = prisma.user.findUnique({
            where: {
                id:data.user_id
            }
        })
        if(!userCheck){
            throw new Error('Usuario não encontrado');
        }

        const productCheck = prisma.product.findUnique({
            where: {
                id:data.product_id
            }
        })
        if(!productCheck){
            throw new Error('Produto não encontrado');
        }

        return await prisma.order.create({
            data,
        })
    }

    //DELETE
    static async delete(id:number){
        return await prisma.order.delete({
            where:{
                id:id
            }
        })
    }

    //PUT
    static async edit(data:Omit<orderModel,'id'>,id:number){
        return await prisma.order.update({
            data,
            where:{
                id:id
            }
        })
    }
}