import { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField } from '@mui/material'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { actions } from '../../../store/userLocStorage/userLocStorage.slice';
import { useGetUserQuery } from '../../../store/users/users';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import SignInStyle from './signIn.module.scss'
import { SignContext } from '../../../context/windowSign';

export const SignIn =()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [mail,setMail]= useState<string>('')
    const [password,setPassword]= useState<string>('')
    const [showPassword, setShowPassword] = useState(false);
    const [error,setError]=useState<string>("")
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const {data}=useGetUserQuery(null)
    const {closeSign}=useContext(SignContext)
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
    function getUserSignIn () {
      
      if(mail.length  ===0 && password.length===0 ){
        setError('Введите почту и пароль')
      }else{
        const indexOfData = data?.find(user=>user.Login===mail)
        if(indexOfData ){
          if(indexOfData.Password === password){
            dispatch(actions.addToUsersLocStorage(indexOfData))
            navigate(`/${indexOfData.id}`)
            setError('')
            closeSign()
          }else{
            setError('Неправильно ввели логин или пароль')
          }
        }
      }
    }
    return(
        <>
        <form className={SignInStyle.form}> 
        <h2>Вход</h2>
        <div className={SignInStyle.signUnput}>
        {error?  <Alert severity="error">{error}</Alert> :""}
        <TextField onChange={(e)=>setMail(e.target.value)} color="main" sx={{ m: 1, width: '300px' }}  id="Email" label="Email" variant="outlined" />
        <FormControl color="main" sx={{ m: 1, width: '300px' }}  variant="outlined">
          <InputLabel  htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
          onChange={(e)=>setPassword(e.target.value)}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        </div>
        <Button onClick={()=>getUserSignIn()} color="main" variant="contained" >
            Вход
        </Button>
        </form>
        </>
    )
}