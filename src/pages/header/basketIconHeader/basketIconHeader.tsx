import { DrawerMenu } from "../drawerMenu/drawerMenu"
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTypedSelector } from "../../../hooks/userTypedSelector";
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
    }));

export const BasketIconHeader =()=>{
    const { products } = useTypedSelector((state) => state.favorites);
    return(
        <>
        <Link to={"/Basket"}>
            <IconButton color="main2" aria-label="cart">
            <StyledBadge badgeContent={products.length} color="main2" >
            <ShoppingCartIcon color="main" />
            </StyledBadge>
            </IconButton>
        </Link>
        <DrawerMenu/>
        </>
    )
}