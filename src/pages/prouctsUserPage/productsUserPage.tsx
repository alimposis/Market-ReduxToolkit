import { useTypedSelector } from "../../hooks/userTypedSelector";
import { Header } from "../header/header"
import { ProductWindow } from "../productWindow/productWindow";

import ProductsUserPAgeStyle from "./productsUserPage.module.scss"

export const ProductsUserPage =()=>{
    const { user } = useTypedSelector((state) => state.userLocStorage);
    const [User]=user
    return(
        <>
        <div className="wrapperMain">
        <Header/>
        <div className={ProductsUserPAgeStyle.body}>
        {User.products?.map(e=>(
            <ProductWindow product={e} key={e.id}/>
          )
          )}
        </div>
        </div>
        </>
    )
}