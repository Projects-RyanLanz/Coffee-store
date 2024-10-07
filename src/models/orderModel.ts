import { Decimal } from "@prisma/client/runtime/library";
 
export interface orderModel{
    id:number,
    user_id:number,
    product_id:number,
    product_qt:number,
    price: Decimal
}