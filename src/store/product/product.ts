import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IProduct } from '../../models/modelsProduct'



export const api = createApi({
    reducerPath: 'api',
    tagTypes:['Product'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API,
    }),
    endpoints:builder =>({
        getProduct: builder.query<IProduct[],null>({
            query:()=>'/' 
        }),
        getKatalog:builder.query<string[],null>({
            query:()=>'/categories' 
        }),
        getCategories:builder.query<IProduct[],string>({
            query:(name)=>`/category/${name}`
        })
    })
})


export const {useGetProductQuery,useGetKatalogQuery,useGetCategoriesQuery,internalActions}=api