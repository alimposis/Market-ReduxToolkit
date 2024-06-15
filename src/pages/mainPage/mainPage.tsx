import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { actions as ProductActions } from '../../store/product/product.slice';
import { useTypedSelector } from '../../hooks/userTypedSelector';
import { useGetProductQuery } from "../../store/product/product"
import { Header } from "../header/header"
import { ProductWindow } from "../productWindow/productWindow"
import MainPageStyle from "./mainPage.module.scss"
import { Loading } from '../loading/loading';
export const MainPage = ()=>{
  const navigate = useNavigate()
  const { user } = useTypedSelector((state) => state.userLocStorage);
  const [User]=user
  const params = useParams()
  const methodIndex = Object.keys(params).length
  const dispatch = useDispatch()
  const {isLoading,data}=useGetProductQuery(null)
  const {product:ProductSearch} = useTypedSelector((state) => state.SearchProduct);
  useEffect(()=>{
    if(data){
      dispatch(ProductActions.Product(data))
    }
    if(methodIndex === 0 && User){
      navigate(`/${User.id}`)
    }
  },[methodIndex,data])

    return(
        <>
        <div className="wrapperMain">
        <Header/>
        <div className={MainPageStyle.body}>
          {isLoading && <Loading/>  }
          {ProductSearch?.map(e=>(
            <ProductWindow product={e} key={e.id}/>
          )
          )}
        </div>
        </div>  
        </>
    )
}