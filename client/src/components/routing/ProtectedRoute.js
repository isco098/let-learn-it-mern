import { Routes, Route, Navigate } from 'react-router-dom';
import { React, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Spinner from 'react-bootstrap/esm/Spinner';
import NavbarMenu from '../layout/NavbarMenu';

const ProtectedRoute = ({children}) => {
    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext);
    if(authLoading){
        return (
            <div className='spinner-container'>
                <Spinner animation='border' varinant='info'/>
            </div>
        )
    }

        return isAuthenticated ? (<> 
            <NavbarMenu />  
            {children} 
        </>) : (<Navigate to='/login' />)
    //    return (
    // <div>
        
    //         <Route 
    //             {...rest} 
    //             element= {
    //                 isAuthenticated ? (
    //                     <><Component {...rest} /></>) : (<Navigate to='/login' />)
    //             }
    //         />
        
    // </div>
    // )
}

export default ProtectedRoute