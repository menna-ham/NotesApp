import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export let UserDataContext = createContext();

export function UserDataContextProvider (props){
    let [userData,setUserData]= useState(null);

    function getUserDataToken (){
        let token = localStorage.getItem('NotesToken')
        let data = jwtDecode(token);
        // console.log(data);
        setUserData(data)

    }
    function ProtectedRouter  (props){
        if(localStorage.getItem('NotesToken')!=null)
        {
           return props.children
        }else{
            return  <Navigate to={'/login'}/>

        }
    }
    function LogOutFunc (){
        localStorage.removeItem('NotesToken');
        setUserData(null);
        <Navigate to={'/login'}/>
    }

    useEffect(()=>{
        if(localStorage.getItem('NotesToken'))
        {
            getUserDataToken(); 
        }
    },[])

    return(
        <UserDataContext.Provider value={{getUserDataToken,ProtectedRouter,LogOutFunc ,userData}}>
            {props.children}
        </UserDataContext.Provider>
    )
}