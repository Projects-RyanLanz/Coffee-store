// controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel'; 

const login = (req: Request, res: Response ) => {
    const { email, password } = req.body;

    // Valide as credenciais do usuário (substitua por sua lógica)
    const user: Pick<userModel,'privilege'> = { privilege:'ADMIN' }; // Suponha que você tenha um usuário válido

    const token = jwt.sign({ privilege: user.privilege}, process.env.API_KEY!, {
        expiresIn: '1h', // O token expira em 1 hora
    });

    res.json({ token });
};

export { login };
