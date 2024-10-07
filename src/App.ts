import express, { Application } from 'express';
import { PrismaClient } from '@prisma/client';
import produtctRouter from './routes/productRoute';
import userRouter from './routes/userRoute';

const app:Application = express()
const PORT:number = 3000

app.use(express.json())

//ROTAS PRODUCT
app.use('/product',produtctRouter) 

//ROTAS USER
app.use('/user',userRouter) 

app.listen(PORT, () => {
    console.log('penis')
})