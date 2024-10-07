import { orderRepository } from "../repositories/orderRepository";
import { Response,Request } from "express";
import { UserRepository } from "../repositories/userRepository";
import { ProductRepository } from "../repositories/productRepository";

export class orderController{

    //GET
    static async getAllOrders(req:Request, res:Response){
        try{
            const order = await orderRepository.getAll()
            res.json(order)
        }catch(e){
            res.status(400).json(e)
        }
    }

    static async getOrderId(req:Request,res:Response){
        const id = Number(req.params.id)

        try{
            const order = await orderRepository.getid(id)
            res.json(order)
        }catch(e){
            res.status(500).json(e)
        }
    }

    //POST
    static async createOrder(req:Request,res:Response){
        const data = req.body

        const userCheck = await UserRepository.getId(data.user_id)
        const productCheck = await ProductRepository.getId(data.product_id)

        if(!userCheck){
            res.json('Usuario não encontrado');
        } 
        if(!productCheck){
            res.json('Produto não encontrado');
        }

        if(productCheck&&userCheck){
            try{
                const order = await orderRepository.create(data)
                res.json(order)
            }catch(e){
                res.json(e)
            }
        }
        
    }

    //DELETE
    static async deleteOrder(req:Request,res:Response){ 
        const id = Number(req.params.id)

        try{
            const order = await orderRepository.delete(id)
            res.json(order)
        }catch(e){
            res.json(e)
        }

    }

    //PUT
    static async editOrder(req:Request,res:Response){ 
        const data = req.body
        const id = Number(req.params.id)

        const userCheck = await UserRepository.getId(data.user_id)
        const productCheck = await ProductRepository.getId(data.product_id)

        if(!userCheck){
            res.json('Usuario não encontrado');
        } 
        if(!productCheck){
            res.json('Produto não encontrado');
        }

        if(productCheck&&userCheck){
            try{
                const order = await  orderRepository.edit(data,id)
                res.json(order)
            }catch(e){
                res.json(e)
            }
        }

    }
}