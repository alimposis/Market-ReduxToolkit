import { createSlice } from "@reduxjs/toolkit"
import { IProduct } from "../../models/modelsProduct";
import { User } from "../../models/modelsUser"
const initState:InitState = {
    user: []
}

interface InitState {
    user: User[];
}

export const userLocStorageSlice = createSlice({
    name:'userLocStorage',
    initialState:initState,
    reducers:{
        addToUsersLocStorage: (state,action)=>{
            state.user.push(action.payload)

        },
        deleteToUsersLocStorage:(state,action)=>{
            const filtered = state.user.filter(item=>item.id !== action.payload.id)
            state.user = filtered
        },addToUserProduct:(state,action)=>{
            const checkProduct = state.user.some(item=>item.products.some(product=>product.id ===action.payload.id))
            if(checkProduct!==true){
                state.user.map(e=>{
                    e.products.push(action.payload)
                })
            }
        },deleteToUserProduct:(state,action)=>{
            const checkProduct = state.user.map(item=>item.products)
            const jsonProduct:[IProduct[]] = JSON.parse(JSON.stringify(checkProduct))
            const [Products] = jsonProduct
            const deleteProduct = Products.findIndex(product=>product.id ===action.payload.id)
            if(deleteProduct !== -1){
                state.user.map(p=>p.products.splice(deleteProduct,1))
            }
        }
        }
})
export const {reducer,actions}=userLocStorageSlice

