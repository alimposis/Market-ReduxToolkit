import { IProduct } from "./modelsProduct"

export interface User{
    name:string
    products:IProduct[]
    Login:string
    Password:string
    id?:string
}