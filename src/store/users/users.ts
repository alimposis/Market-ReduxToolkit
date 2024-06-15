import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { User } from '../../models/modelsUser'

export const api_users = createApi({
    reducerPath: 'api_users',
    tagTypes:['user'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_MOCKAPI,
    }),
    endpoints:builder =>({
        getUser: builder.query<User[],null>({
            query:()=>'/' 
        }),
        createUser: builder.mutation({
            query:(user)=>({
                body:user,
                url:'/',
                method: 'POST'
            }),
        }),
        editUser: builder.mutation({
            query:(user)=>({
                body:user,
                url:`/${user.id}`,
                method: 'PUT'
            })
        })
    }),
})

export const {useGetUserQuery,useCreateUserMutation,useEditUserMutation}=api_users