import { PrismaClient } from "@prisma/client";
import { ProductModel } from "../models/productModel";

const prisma = new PrismaClient()

export class ProductRepository {
    //GET 
    static async getAll(){
        return await prisma.product.findMany();
    }

    static async getId(id:number){
        return await prisma.product.findUnique({
            where:{
                id:id
            }
        });
    }

    //POST
    static async create(data: Omit<ProductModel, 'id'>): Promise<ProductModel> {
        const newProduct = await prisma.product.create({
            data,
        });
        return newProduct as ProductModel; 
    }

    //DELETE
    static async delete(id:number): Promise<ProductModel> {
        const deleteProduct = await prisma.product.delete({
            where: {
                id:id
            } 
        });
        return deleteProduct as ProductModel; 
    }

    //PUT
    static async edit(id:number,data: Omit<ProductModel, 'id'>): Promise<ProductModel> {
        const updateProduct = await prisma.product.update({
            where: {id},
            data,
        });
        return updateProduct as ProductModel; 
    }


}