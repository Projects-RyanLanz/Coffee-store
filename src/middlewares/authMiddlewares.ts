import jwt,{ Jwt, JwtPayload } from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
 
interface AuthRequest extends Request {
    user?: JwtPayload
}

const authMiddleware= (req:AuthRequest, res:Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    } 

    const API_KEY = process.env.API_KEY
    if (!API_KEY) {
        return res.status(403).json({ message: 'Token errado' });
    }
    
    jwt.verify(token, API_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json(err);
        }
        if (typeof decoded === 'object') {
            req.user = decoded;  // Agora o TypeScript sabe que req.user é JwtPayload
        } else {
            return res.status(401).json({ message: 'Token aaaaaaaaaaa' });
        }
        next();
    });
}

export default authMiddleware;
