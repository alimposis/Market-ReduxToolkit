import { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useGetUserQuery } from '../../../store/users/users';
import { useCreateUserMutation } from '../../../store/users/users';

import SignUpStyle from './signUp.module.scss'

export const SignUp =()=>{
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [password,setPassword]= useState<string>("")
    const [email,setEmail]=useState<string>("")
    const [copyPassword,setCopyPassword]= useState<string>("")
    const [error,setError]=useState<string>("")
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const [createUser]=useCreateUserMutation()

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
    const {data}=useGetUserQuery(null)
    async function  register  (){
        if(password=== "" && email=== "" && copyPassword=== "" ){
          setError("Введите логин и пароль")
            return
        }else if(copyPassword.length && password.length <6 ){
            setError("В пароле должно быть минимум 6 символов")
            return
        }else if(copyPassword !== password ){
            setError("Пароли не совпадают")
            return
        }else{
          const userSignUp ={
            name:'',
            products:[],
            Login:email,
            Password:password
          }
          const indexOfData = data?.find(user=>user.Login===email)
          if( !indexOfData ){
          await createUser(userSignUp)
          document.location.reload()
          }
        }
    }
    return(
        <>
        <form className={SignUpStyle.form}>
        <h2>Регистрация</h2>
        <div className={SignUpStyle.signUnput}>
        {error?  <Alert severity="error">{error}</Alert> :""}
        <TextField onChange={(e)=>setEmail(e.target.value)} color="main" sx={{ m: 1, width: '300px' }} id="Email" label="Email" variant="outlined" />
        <FormControl color="main" sx={{ m: 1, width: '300px' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
        <TextField onChange={(e)=>setCopyPassword(e.target.value)} color="main" sx={{ m: 1, width: '300px' }} id="standard-basic" label="Copy pasword" variant="outlined" type="password"/>
        </div>
        <Button onClick={()=>register()} color="main" variant="contained" >
            Регистрация
        </Button>
        </form>
        </>
    )
}