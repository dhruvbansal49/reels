import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../Context/AuthProvider'
import { storage, database } from '../firebase'
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


import './Signup.css';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    }
  }));

function Signup() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null)

    const { signup, currentUser } = useContext(AuthContext);

    const history = useHistory();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await signup(email, password);
            let uid = res.user.uid;
            setLoading(false);
            console.log(uid);

            const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            // fn1 -> for tracking the progress of the file ie. how much file has been uploaded
            // fn2 -> for checking if there is error while uploading the file
            // fn3 -> when upload is finished or successful, for this we have fn3

            uploadTaskListener.on('state_changed', fn1, fn2, fn3);

            function fn1(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }

            function fn2(error) {
                setError(error);
                setTimeout(() => {
                    setError('')
                }, 2000);
                setLoading(false)
            }

            async function fn3() {
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
                console.log(downloadUrl);

                await database.users.doc(uid).set({
                    email: email,
                    userId: uid,
                    username: name,
                    createdAt: database.getCurrentTimeStamp(),
                    profileUrl: downloadUrl,
                    postIds: []
                })
                setLoading(false);
                console.log('User has Signed up');

                history.push('/');
            }

        }
        catch (err) {
            setError(error);
            setTimeout(() => {
                setError('')
            }, 2000);
            setLoading(false)

        }
    }

    const handleFileSubmit = (e) => {
        let file = e.target.files[0];
        if (file != null)
            setFile(file);
    }

    useEffect(() => {
        if (currentUser) // Meaning if User is already logged in, then No need to show the SignUp.js and direct him to
        // Feed.js
        {
            history.push('/')
        }
    }, []);

    return (
        <div id="wrappers">
                    {/* <img src="https://i.imgur.com/zqpwkLQ.png" /> */}
                    <div className="insta-head">
                        <h1>Reels</h1>
                        </div>
            <div className="main-contents">
                <div className="l-parts">
                    <form onSubmit={handleSignup} >
                        <div>
                            {/* <label htmlFor=''>UserName</label> */}
                            {/* <input type='text' value={name} onChange={(e) => setName(e.target.value)} className="input-1s" placeholder="Username" /> */}
                            <TextField
                                id="outlined-password-input"
                                label="Username"
                                type="text"
                                autoComplete="current-password"
                                variant="outlined"
                                value={name} onChange={(e) => setName(e.target.value)} className="input-1s" 
                                style={{marginBottom:15}} />
                            <div className="overlap-text">
                                {/* <label htmlFor=''>Email</label> */}
                                {/* <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className="input-2s" placeholder="Email" /> */}
                                <TextField
                                id="outlined-password-input"
                                label="Email"
                                type="text"
                                autoComplete="current-password"
                                variant="outlined"
                                value={email} onChange={(e) => setEmail(e.target.value)} className="input-2s"
                                style={{marginBottom:15}}   />
                                {/* <label htmlFor=''>Password</label> */}
                                {/* <input type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-2s" /> */}
                                <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                value={password} onChange={(e) => setPassword(e.target.value)} className="input-2s" 
                                style={{marginBottom:15}} />
                                {/* <label htmlFor='profile'>Profile image</label> */}
                                <input type='file' accept='image/*' onChange={handleFileSubmit} className="input-2s" placeholder="Profile-Image"></input>

                                {loading ? <LinearProgress color='secondary' style={{ marginTop: '6%' }} /> : <></>}

                            </div>
                            <br></br>
                            {/* <input type="submit" value="Sign Up" className="btn" disabled={loading} /> */}
                            <Button variant="contained" color="primary" type="submit" value="Sign Up" className="login-btn" disabled={loading}>Sign Up</Button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="sub-contents">
                <div className="s-parts">
                    Already have an account? <a href="/login">Login</a>
                </div>
            </div>
        </div>
    )
}

export default Signup