import {useState} from 'react'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Aizen from '../../img/aizen/OIP.jpg'

import {  useContext } from "react";

import { SignContext } from "../../context/windowSign";

import SignWindowStyle from './signWindow.module.scss'
import { SignIn } from './signIn/signIn';
import { SignUp } from './signUp/signUp';

export const SignWindow =()=>{
    const [value, setValue] = useState('1');
    const {closeSign}=useContext(SignContext)
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      event.preventDefault()
      setValue(newValue);
    };
    function StateValue (){
        if(value==="1"){
          return true
        }else if(value==="2"){
          return false
        }
    }
    const state = StateValue()
    return(
        <>
        <div className={SignWindowStyle.wrapperSignWindow} onClick={()=>closeSign()}/>
        <div className={SignWindowStyle.signWindow}>
        <div className={SignWindowStyle.closeWindow}>
        <Tooltip color='main2' onClick={()=>closeSign()} title="Close">
        <IconButton >
        <CloseIcon />
        </IconButton>
        </Tooltip>
        </div>
        <div  className={SignWindowStyle.formWindow}>
      <Tabs textColor="secondary" indicatorColor="secondary" value={value} onChange={handleChange} aria-label="disabled tabs example">
      <Tab color="main" value="1" label="Вход" />
      <Tab color="main" value="2" label="Регистрация" />
      </Tabs>
        {state?<SignIn />:<SignUp/>}
        <img className={SignWindowStyle.aizen} src={Aizen}alt="" />
        </div>
        </div>
        </>
    )
}


