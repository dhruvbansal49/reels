import './App.css';

import Signup from './Components/Signup';
import AuthProvider, { AuthContext } from './Context/AuthProvider';
import Main from './Material UI/Header';
import Login from './Components/Login';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
// import IntersectionApi from './Components/IntersectionApi';
import Feed from './Components/Feed';
import Profile from './Components/Profile';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <Router>
    {/* <Main></Main> */}
    <AuthProvider>
    <Switch>
    {/* <AuthProvider> */} {/* Do not place AuthProvider here, because only Components are allowed in between Switch */}
    <PrivateRoute exact path="/" component={Feed}></PrivateRoute>
    <PrivateRoute path="/profile" component={Profile}></PrivateRoute>
    <Route path="/login" component={Login}></Route>
    <Route path="/signup" component={Signup}></Route> 
    {/* </AuthProvider> */}
    </Switch>
    </AuthProvider>
    </Router>
  );
}

export default App;
