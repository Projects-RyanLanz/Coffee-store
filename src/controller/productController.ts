import { ProductRepository } from "../repositories/productRepository";
import { Request,Response } from "express";
import { ProductModel } from "../models/productModel";

 
export class productController{

    //GET
    static async getAllProduct(req:Request,res:Response) {
        try{
            const prod = await ProductRepository.getAll()
            res.json(prod)
        }catch(e){
            res.status(500).json(e+' -- - - -AAAAAAAAAAA 00  - -  ')
        }
    }

    static async getProductId(req:Request,res:Response) {
        const id = Number(req.params.id)

        try{
            const prod = await ProductRepository.getId(id)  
            res.json(prod)
        }catch(e){
            res.status(500).json({e})
        }
    }    

    //POST
    static async createProduct(req:Request,res:Response) {
        const data: Omit<ProductModel, 'id'> = req.body

        try{
            const prod = await ProductRepository.create(data)
            res.status(200).json('Item adicionado!!!') 
        }catch{
            res.status(400).json({ error: 'Invalid input' });
        }
    }

    //DELETE
    static async deleteProduct(req:Request,res:Response) { 
        const id: number = Number(req.params.id)

        try{
            const prod = await ProductRepository.delete(id)
            res.status(204).send();
        }catch(e){
            res.json(e)
        }
    }

    //UPDATE
    static async updateProduct(req:Request,res:Response) {
        const data: Omit<ProductModel, 'id'> = req.body
        const id: number = Number(req.params.id)

        try{
            const prod = await ProductRepository.edit(id,data)
            res.status(200).json(prod)
        }catch(error){
            res.status(400).json({ error: 'Invalid input' });
        }
    }
}
