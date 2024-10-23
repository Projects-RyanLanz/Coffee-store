import { UserRepository } from "../repositories/userRepository";
import { Request, Response } from "express";
import { userModel } from "../models/userModel";
import jwt from "jsonwebtoken";

export class UserController{

    //GET
    static async getAllUser(req:Request,res:Response){
        try{
            const user = await UserRepository.getAll()
            res.json(user)
        }catch(e){
            res.status(500).json(e)
        }
    }

    static async getUserId(req:Request,res:Response){
        const id = Number(req.params.id);

        try{
            const user = await UserRepository.getId(id)
            res.json(user)
        }catch(e){
            res.status(500).json(e)
        }
    }

    static async getUserPrivilege(req:Request,res:Response){
        const {email,password} = req.body

        try{
            const user:Pick<userModel,'privilege'> | null = await UserRepository.getLogin(email,password)
            return user;
        }catch(e){
            res.status(500).json(e)
        }

    }
    //POST
    static async createUser(req:Request,res:Response){
        const data = req.body

        try{
            const user = await UserRepository.create(data)
            res.json(user)
        }catch(e){
            res.status(500).json(e)
        }
    }

    //DELETE
    static async deleteUser(req:Request,res:Response){
        const id = Number(req.params.id);

        try{
            const user = await UserRepository.delete(id)
            res.json('Deletado com sucesso')
        }catch(e){
            res.status(500).json(e)
        }
    }

    //PUT
    static async editUser(req:Request,res:Response){
        const id = Number(req.params.id)
        const data = req.body 

        try{
            const user = await UserRepository.edit(data,id)
            res.json(user + 'Editado com sucesso')
        }catch(e){
            res.status(500).json(e)
        }
    }
}