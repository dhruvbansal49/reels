import React, { useState, useEffect, useContext } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../Context/AuthProvider'
import { storage, database } from '../firebase'
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import './Login.css'; // same style used in login as well as in sign up


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  }
}));
function Login() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState({ message: '' });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null)

  const { login, currentUser } = useContext(AuthContext);

  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res = await login(email, password);
      let uid = res.user.uid;

      history.push('/'); // It is used to redirect to our Feed Page

      setLoading(false);
      console.log(uid);
    }
    catch (err) {
      let obj = { ...error, message: err.message };
      setError(obj);
      setTimeout(() => {
        setError('')
      }, 5000);
      setLoading(false)

    }
  }
  useEffect(() => {
    if (currentUser) // Meaning if User is already logged in, then No need to show the login.js and direct him to
    // Feed.js
    {
      history.push('/')
    }
  }, []);

  return (
    <div id="wrapper">
      <div className="insta-logo">
        <img src="https://www.instagram.com/static/images/homepage/home-phones@2x.png/9364675fb26a.png"></img>
        <ul class="slideshow">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
      </div>
          <div className="insta-heading">
            <h1>Reels</h1>
            </div>
          {/* <img src="https://i.imgur.com/zqpwkLQ.png" /> */}
      <div className="main-content">
        <div className="l-part">
          <form onSubmit={handleLogin} className={classes.root}>
            <div>
              {/* <label htmlFor=''>Email</label> */}
              {/* <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className="input-1" placeholder="Email"/> */}
              <TextField
                id="outlined-password-input"
                label="Email"
                type="email"
                autoComplete="current-password"
                variant="outlined"
                value={email} onChange={(e) => setEmail(e.target.value)} />
              <div className="overlap-text">
                {/* <label htmlFor=''>Password</label> */}
                {/* <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className="input-2" placeholder="Password" /> */}
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  value={password} onChange={(e) => setPassword(e.target.value)} />

              </div>
              <br></br>
              {/* <input type="submit" value="Login" className="btn" disabled={loading} /> */}
              <Button variant="contained" color="primary" type="submit" value="Login" className="login-btn" disabled={loading}>Login</Button>
            </div>
            {/* <button type='submit' disabled={loading}>Login</button> */}
            {error.message ? <p>{error.message}</p> : <></>}

          </form>
        </div>
        <div className="sub-content">
          <div className="s-part">
            Don't have an account?<a href="/signup"> Sign up</a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login