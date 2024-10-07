// types/express.d.ts
import * as express from 'express';
 
declare global {
    namespace Express {
        interface Request {
            user?: UserSession; // ou defina um tipo mais específico para o usuário
        }
    }
}
