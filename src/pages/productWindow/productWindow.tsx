
import productWindowStyle from "./productWindow.module.scss"
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Rating from '@mui/material/Rating';
import { useLocation } from "react-router-dom";
import { useDispatch} from "react-redux";

import { useEditUserMutation } from "../../store/users/users";
import { IProduct } from "../../models/modelsProduct";
import { actions } from "../../store/favorites/favorites.slice";
import { actions as actionsUserLocS } from "../../store/userLocStorage/userLocStorage.slice";
import { useTypedSelector } from "../../hooks/userTypedSelector";
import { useEffect, useState } from "react";
import { Alert } from "@mui/material";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface ProductProps{
    product:IProduct
}

export const ProductWindow =({product}:ProductProps)=>{
    const [stateError,setStateError]= useState<string | undefined>(undefined)
    const [stateCheckbox,setStateCheckbox]=useState(false)
    const [editUser]= useEditUserMutation()
    const {user} = useTypedSelector(state=> state.userLocStorage);

    useEffect(()=>{
        function CheckedCheckbox(){
            if(user.length !==0){
                const [User] = user
                const prodcuctsUser = User.products
                const checkUserProduct = prodcuctsUser.some(p=>p.id===product.id)
                if(checkUserProduct ===true){
                    setStateCheckbox(true)
                }
            }   
        }
        CheckedCheckbox()
    },[])

    function EditUserFunc(product:IProduct){
        
        const [User] = user

        if(User){
            const prodcuctsUser = User.products
            const checkUserProduct = prodcuctsUser.some(p=>p.id===product.id)
            if(checkUserProduct!==true){
                dispatch(actionsUserLocS.addToUserProduct(product))
                editUser(User)
                setStateCheckbox(true)
                setStateError(undefined)
            }else if(checkUserProduct ===true){
                dispatch(actionsUserLocS.deleteToUserProduct(product))
                editUser(User)
                setStateCheckbox(false)
                setStateError(undefined)
            }
        }else if(!User){
            setStateError("Войдите в аккаунт")
        }
    }

    const location = useLocation().pathname
    const dispatch = useDispatch()

    function locationProduct (location:string){
        if(location === '/Basket'){
            return true
        }else{
            return false
        }
    }
    const locationPW = locationProduct(location)
    return(
        <>
        <div className={productWindowStyle.wrapperWindow}>
                <Checkbox
                checked={stateCheckbox}
                onClick={()=>EditUserFunc(product)}
                color="main"
                {...label}
                icon={<BookmarkBorderIcon/>}
                checkedIcon={<BookmarkIcon />}
                />
                {stateError && <Alert severity="error">{stateError}</Alert>}
            <Rating name="half-rating-read" defaultValue={product.rating.rate} precision={0.5} readOnly />
            <img className={productWindowStyle.image} src={product.image} alt="" />
            <h2 className={productWindowStyle.title}>{product.title}</h2>
            {locationPW?         
            <Button onClick={()=>dispatch(actions.deleteToFavorites(product))}  color="error" variant="contained" disableElevation>
            Убрать из корзины
            </Button>:
            <Button onClick={()=>dispatch(actions.addToFavorites(product))} color="main" variant="contained" disableElevation>
            Положить в корзину
            </Button>
            }
        </div>
        </>
    )
}