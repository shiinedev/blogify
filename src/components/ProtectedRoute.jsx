import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children , redirectTo="/signin"}) => {

    const {isLoggedIn,isLoading} = useAuth();

    if(isLoading){
        return(
        <div className='min-h-screen flex justify-center items-center'>
            <div className='animate-spin w-12 h-12 rounded-full border-y-2 border-orange-500'>

            </div>
        </div>
        )
    }

    if(!isLoggedIn){
        return <Navigate  to={redirectTo} replace />
    }
  return children;
}

export default ProtectedRoute
