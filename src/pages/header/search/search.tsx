import { TextField } from "@mui/material";
import { useDispatch } from 'react-redux';

import { actions as ProductActions } from '../../../store/product/product.slice';

export const Search =()=>{
    const dispatch = useDispatch()
    return(
        <>
        <TextField
            onChange={e=> e.target.value?dispatch(ProductActions.ProductSearch(e.target.value)):document.location.reload()}
            sx={{width:'300px'}} 
            color="main2" 
            id="outlined-basic" 
            label="Outlined" 
            variant="outlined" />
        </>
    )
}