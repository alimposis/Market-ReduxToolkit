import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../models/modelsProduct";

interface InitialStateFavorites {
    products: IProduct[];
}

const initState: InitialStateFavorites = {
    products: []
}


export const favoritesSlice = createSlice({
    name:'favorites',
    initialState:initState,
    reducers:{
        addToFavorites: (state,action)=>{
            const checkProduct = state.products.some(p=>p.id===action.payload.id)
            if(!checkProduct){
                state.products.push(action.payload)
            }
        },
        deleteToFavorites:(state,action)=>{
            const filtered = state.products.filter(item=>item.id !== action.payload.id)
            state.products = filtered
        }
        }
})
export const {actions,reducer}= favoritesSlice