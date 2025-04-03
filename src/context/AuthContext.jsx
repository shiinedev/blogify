import { createContext, useContext ,} from "react";
import { useEffect } from "react";
import { useState } from "react";
import {  getUserProfile, onAuthChange, signOut } from "../lib/Auth";


const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const[user,setUser] = useState(null);
    const[profile,setProfile] = useState(null);
    const[isLoading,setIsLoading] = useState(true);

    useEffect(() =>{

        const cleanUp = onAuthChange(async (user)=>{
            setUser(user);

            if(user){
                try {
                    const userProfile = await getUserProfile(user.id);
                    console.log(userProfile);
                    
                    setProfile(userProfile);
                   
                } catch (error) {
                    console.log("Error fetching user",error)
                }
            }else{
                setProfile(null);
            }
            setIsLoading(false);
        });
        return cleanUp;
    },[]);

    const logOut = async () =>{
        try {
            await signOut()
        } catch (error) {
            console.log("logOut error ",error)
        } 
    }
    const value = {
        user,
        profile,
        isLoading,
        isLoggedIn : !!user,
        logOut
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    const context = useContext(AuthContext);

    if(context === null){
        console.log("useAuth must be with in AuthProvider")
    }

    return context
}