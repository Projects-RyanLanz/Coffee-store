import express, { Application } from 'express';
import { PrismaClient } from '@prisma/client';
import produtctRouter from './routes/productRoute';
const app:Application = express()
const PORT:number = 3000

app.use(express.json())

//ROTAS PRODUCT
app.use('/product',produtctRouter) 

app.listen(PORT, () => {
    console.log('penis')
})