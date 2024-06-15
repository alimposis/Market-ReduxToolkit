import { createContext } from "react";
import { useState } from "react";

interface ISignContext {
    sign:boolean
    openSign:()=>void
    closeSign:()=>void 
}
export const SignContext = createContext<ISignContext>({
    sign:false,
    openSign:()=>{},
    closeSign:()=>{}
})
export const SignState=({children}:{children:React.ReactNode})=>{
    const [sign,setSign] = useState<boolean>(false)
    const openSign =()=>setSign(true)
    const closeSign = ()=>setSign(false)
    return(
        <>
        <SignContext.Provider value={{sign,closeSign,openSign}}>
        {children}
        </SignContext.Provider>
        </>
    )
}