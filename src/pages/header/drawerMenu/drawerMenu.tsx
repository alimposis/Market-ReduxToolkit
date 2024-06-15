import {useState} from 'react'
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

import { useGetKatalogQuery } from '../../../store/product/product';

export const DrawerMenu =()=>{  
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const {data}=useGetKatalogQuery(null)
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
      };
    const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List >
          <ListItem onClick={()=>navigate(`/`)} key={'Главная'} disablePadding>
            <ListItemButton>
              <ListItemText  primary={'Главная'} />
            </ListItemButton>
          </ListItem>
        {data && data.map(e=>     
        <ListItem   key={Math.random()} onClick={()=>{setOpen(false),navigate(`/category/${e}`)}} >
          <ListItemButton >
          <ListItemText primary={e} />
          </ListItemButton>
        </ListItem>)}
      </List>
    </Box>
  );
    return(
        <>
        <Tooltip title="Menu">
            <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
            </IconButton>
        </Tooltip>
        <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
        </Drawer>
        </>
    )
}