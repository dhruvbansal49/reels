import React,{useContext} from 'react'
import { isElement } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { Route,Redirect } from 'react-router-dom';
import {AuthContext} from '../Context/AuthProvider'; //We are importing AuthContext, in order to get the currentUser value

// Using currentUser defined in AuthProvider.js, we can determine whether user at a particular time is authorized
// to see the Feed page or not
function PrivateRoute({component:Component,...rest}) {
    const {currentUser}=useContext(AuthContext);
    return (
        // this props contain history,match and location
     <Route {...rest} render={(props)=>{ // rest will contain exact and path props defined in PrivateRoute
      return currentUser?<Component {...props} />:<Redirect to='/login'/> // here basically we have passed props an argument
      // to the Component isElement.Feed.js
      //  This basically checks if user is not logged in then re-direct him to login page else render his feed page
     }}/>
    )
}

export default PrivateRoute
