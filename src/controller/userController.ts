import { UserRepository } from "../repositories/userRepository";
import { Request, Response } from "express";
import { userModel } from "../models/userModel";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.API_KEY || '1234'; // Use uma chave secreta


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
            const user:userModel | null = await UserRepository.getLogin(email,password)
            if (!user) {
                return res.status(401).json({ message: 'Credenciais invalidas!' });
            }   
 
            if (password != user.password){
                return res.status(401).json({ message: 'Credenciais invaldias!' });
            }

            const token = jwt.sign({ email:user.email,password:user.password }, SECRET_KEY,{
                expiresIn: '1h'
            })

            res.status(200).json({token, user});
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