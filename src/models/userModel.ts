import { Privilege } from "@prisma/client";

export interface userModel {
    id:number,
    name:string,
    email:string,
    password:string,
    privilege:Privilege, 
}