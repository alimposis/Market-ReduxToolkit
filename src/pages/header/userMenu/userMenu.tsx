import { useState } from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { actions } from '../../../store/userLocStorage/userLocStorage.slice';
import { useTypedSelector } from '../../../hooks/userTypedSelector';

export const UserMenu =()=>{

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user}=useTypedSelector(state => state.userLocStorage)
    const [User] = user
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button
          color="main"
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {User.Login}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={()=>navigate(`/${User.id}/productsUser`)}>Favorites</MenuItem>
          <MenuItem onClick={()=>{dispatch(actions.deleteToUsersLocStorage(User))&& navigate('/')}}>Выход</MenuItem>
        </Menu>
      </div>
    )
}