import {  useContext } from "react";
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import {  useParams } from "react-router-dom";


import { UserMenu } from "./userMenu/userMenu";
import { useMediaQuery } from 'react-responsive'
import { Link,useNavigate } from "react-router-dom";
import { SignContext } from "../../context/windowSign";
import { SignWindow } from "../signWindow/signWindow";
import {Catalog} from "./catalog/catalog"
import { useTypedSelector } from "../../hooks/userTypedSelector";
import { BasketIconHeader } from "./basketIconHeader/basketIconHeader";


import HeaderStyle from "./header.module.scss"
import { Search } from "./search/search";



export const Header = ()=>{
    const isHeaderNavMaxW = useMediaQuery({ query: '(max-width: 730px)' })
    const isHeaderNavMinW = useMediaQuery({ query: '(min-width: 730px)' })
    const navigate = useNavigate()
    const {openSign,sign}=useContext(SignContext)
    const { products } = useTypedSelector((state) => state.favorites);
    const StyledBadge = styled(Badge)(({ theme }) => ({
      '& .MuiBadge-badge': {
          right: -3,
          top: 13,
          border: `2px solid ${theme.palette.background.paper}`,
          padding: '0 4px',
      },
      }));
        const { user } = useTypedSelector((state) => state.userLocStorage);
  const [User]=user
  const paramsRout = useParams()
  const methodIndex = Object.keys(paramsRout).length
  function navigateFunc (){
    if(methodIndex === 0 && User){
      navigate(`/${User.id}`)
    }else{
      navigate('/')
    }
  }
    return(
        <>
        <div className={HeaderStyle.wrapperHeader}>
        {isHeaderNavMinW &&
            <div className={HeaderStyle.bodyAll}>
            <h1 onClick={() => navigateFunc()}  className={HeaderStyle.logo} >Магазин</h1>
            <Search/>
            <Link to={"/Basket"}>
            <IconButton color="main2" aria-label="cart">
            <StyledBadge badgeContent={products.length} color="main2" >
            <ShoppingCartIcon color="main" />
            </StyledBadge>
            </IconButton>
            </Link>
            <Catalog/>
            {User? <UserMenu/>:<Button onClick={()=>openSign()} color="main2" sx={{height:"40px"}} variant="outlined">Войти</Button>}
            </div>
        }
        {isHeaderNavMaxW &&
        <div className={HeaderStyle.bodyAdaptive}>
          <div className={HeaderStyle.adaptiveHeader}>
          <h1 onClick={() => navigate('/')}  className={HeaderStyle.logo} >Магазин</h1>
        {User? <UserMenu/>:<Button onClick={()=>openSign()} color="main2" sx={{height:"40px"}} variant="outlined">Войти</Button>}
          <BasketIconHeader/>
        </div>
        <div className={HeaderStyle.adaptiveSearch}>
        <Search/>
        </div>
          </div>
        }
        </div>
        {sign && <SignWindow/>}
        </>
    )
}