import React, { useEffect, useState } from 'react';


export interface AuthContextInterface {
    login : (token : string  )=> void
    logout : ()=> void
    isUser : ()=> boolean
}


export const authContextDefaults: AuthContextInterface = {
    login : (str)=>  localStorage.setItem('user-session',str) ,
    logout : ()=> useEffect(()=>{ localStorage.clear()},[]) ,
    isUser : ()=>{
        const [user,setUser] = useState(false)
        useEffect(()=>{
            const usr = localStorage.getItem('user-session')
            if (usr) {
                setUser(true)
            }
        },[])
        return user
    }
};

export const AuthContext = React.createContext<AuthContextInterface>(
  authContextDefaults
);