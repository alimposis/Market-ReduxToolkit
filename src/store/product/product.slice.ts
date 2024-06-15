import { createSlice } from "@reduxjs/toolkit"
import { IProduct } from "../../models/modelsProduct";

const initState:InitState = {
    product: []
}
interface InitState {
    product: IProduct[] ;
}

export const productSearchSlice = createSlice({
    name:'SearchProduct',
    initialState:initState,
    reducers:{
        Product: (state,action)=>{
            state.product = action.payload
            state.product = state.product
        },
        ProductSearch: (state,action)=>{
            const filterState = state.product.filter(e=>e.title === action.payload)
            state.product = filterState
        },
    }
})

export const {reducer,actions}=productSearchSlice