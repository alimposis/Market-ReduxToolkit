import { useParams } from 'react-router-dom';

import { ProductWindow } from "../productWindow/productWindow";
import { Header } from "../header/header"
import CategoryPageStyle from "./categoryPage.module.scss"
import { useGetCategoriesQuery } from '../../store/product/product';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/userTypedSelector';
import { actions as ProductActions } from '../../store/product/product.slice';

export const CategoryPage =()=>{
    const params = useParams().categotyId
    const {data}=useGetCategoriesQuery(`${params}`)
    const dispatch = useDispatch()
    const {product:ProductSearch} = useTypedSelector((state) => state.SearchProduct);
    useEffect(()=>{
      if(data){
        dispatch(ProductActions.Product(data))
      }
    },[data])
  
    return(
        <>
        <div className="wrapperMain">
            <Header/>
            <div className={CategoryPageStyle.body}>
                {ProductSearch?.map(e=>(
                <ProductWindow product={e} key={e.id}/>
                )
                )}
            </div>
        </div>
        </>
    )
}