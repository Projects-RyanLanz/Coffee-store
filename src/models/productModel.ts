import { Decimal } from "@prisma/client/runtime/library";

export interface ProductModel{
    id:number,
    name:string,
    desc:string,
    price:Decimal,
    availability?:boolean
}