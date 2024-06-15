
import UserPageStyle from './userPage.module.scss'
import { Header } from '../header/header'

export const UserPage = ()=>{


    return(
        <>
        <div className="wrapperMain">
            <Header/>
            <div className={UserPageStyle.body}>

            </div>
        </div>
        </>
    )
}