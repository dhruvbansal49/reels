import React,{useContext,useState,useEffect} from 'react'
import {auth} from '../firebase'

export const AuthContext=React.createContext();

function AuthProvider({children}) {

    const[currentUser,setCurrentUser]=useState();
    const[loading,setLoading]=useState(true);
    
    function signup(email,password)
    {
        return auth.createUserWithEmailAndPassword(email,password); // basically returning the promise
    }
    function login(email,password)
    {
        return auth.signInWithEmailAndPassword(email,password);
    }
    function logout()
    {
        return auth.signOut();
    }

    useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged((user)=>{
            setCurrentUser(user);
            setLoading(false);
        }) // this is basically ComponentDidMount

        return ()=>{ // this is basically ComponentWillUnmount
            unsubscribe(); // rempving the listener or
            // observer ie.onAuthStateChanged()
        }
    },[])
    const value = {
        currentUser,
        login,
        signup,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
         {!loading&&children} {/*or {!loading?children:<></>} meaning if there is no loading then render children */}
        </AuthContext.Provider>
    )
}

export default AuthProvider
