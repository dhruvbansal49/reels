import React, { useContext, useState, useEffect } from 'react'
import Header from '../Material UI/Header'
import { AuthContext } from '../Context/AuthProvider'
import { database } from '../firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
// import IntersectionApi from './IntersectionApi';
import UploadFile from './UploadFile';
import './Profile.css'
import { EcoTwoTone } from '@material-ui/icons';
import { useEventCallback } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import Ticker from 'react-ticker';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import './Posts.css'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Video from './Video';
import Likes from './Likes';
import AddComment from './AddComment';
import Comments from './Comments';



import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ImageAvatars from '../Material UI/ImageAvatars';
import Button from '@material-ui/core/Button';


import ProfileBottom from './ProfileBottom'
import EditProfile from './EditProfile';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  progress: {
    position: "relative",
    top: "250px",
    left: "650px",
  },
}));

function Profile({ postData }) {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const classes = useStyles();

  useEffect(() => {  // Here we are basically using the 2nd variation of useEffect ie. page will be re-rendered
    // whenever, currentUser changes.
    // Also we have attached -> onSnapshot() method in order to track the changes done by currentUser such
    // as- changing his profile image etc
    const unsub = database.users.doc(currentUser.uid).get().then((doc) => {

      //console.log(doc.data());
      setUserData(doc.data())
    });

  }, [currentUser])

  // function getPostData()
  // {
  //   userData.postIds.map(async (pid) => {
  //   let post=await database.posts.doc(pid).get();
  //     //let obj={url:post.data().postUrl}
  //     //console.log(obj);
  // });
  //  }

  return (
    <>
      {userData == null ? 
      <div className={classes.root}>
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={150}
          timeout={3000} //3 secs
          className={classes.progress}
        /></div>:
        <>
         { userData.postIds.length == 0 ? 
         <>
         <Header userData={userData}></Header>
        <div style={{ height: '9.5vh' }} />    
         <div className='profile-container'>
            <div className='center'>
            {userData == null ? <div className={classes.root}>
                <Loader
                  type="ThreeDots"
                  color="#00BFFF"
                  height={100}
                  width={150}
                  timeout={3000} //3 secs
                  className={classes.progress}
                /></div> : 
                <>
                <div className="profile-container-postNo">
                <img className="profile-img-postNo" src={userData.profileUrl} />
                <div className="info">
                  <h5 className="heading-postNo">{userData.username}</h5>
                  <div className="post-cnt">
                    <h6 className="sub-head"> <span style={{ fontWeight: 500 }}>No. Of Posts:- </span>{userData.postIds == null ? 'None' : userData.postIds.length}</h6>
                    <br></br>
                    <h6 className="sub-head-email"><span style={{ fontWeight: 500 }}>Email:- </span>{userData.email}</h6>
                  <br></br>
                  <h4 style={{marginLeft:53}}>Currently No Posts!</h4>
                  </div>
                </div>
                </div>
                </>
            }
            </div>
            </div>
         </> :
           <>
          <Header userData={userData}></Header>
          <div style={{ height: '9.5vh' }} />

          <div className='profile-container'>
            <div className='center'>
              {userData == null ? <div className={classes.root}>
                <Loader
                  type="ThreeDots"
                  color="#00BFFF"
                  height={100}
                  width={150}
                  timeout={3000} //3 secs
                  className={classes.progress}
                /></div> : <>
                <div class="container">
                <img className="profile-img" src={userData.profileUrl} />
                <div className="info">
                  <h5 className="heading">{userData.username}</h5>
                  <div className="post-cnt">
                    <h6 className="sub-head"> <span style={{ fontWeight: 500 }}>No. Of Posts:- </span>{userData.postIds == null ? 'None' : userData.postIds.length}</h6>
                    <br></br>
                    <h6 className="sub-head-email"><span style={{ fontWeight: 500 }}>Email:- </span>{userData.email}</h6>
                    {/* <Button variant="outlined" color="secondary" size='medium' style={{marginLeft:" 42rem"}}>Edit</Button> */}
                    <EditProfile userData={userData}></EditProfile>

                  </div>
                </div>
                {
                      userData.postIds.length == 0 ? <Typography className={classes.typo} variant='body2'>Currently No Posts</Typography> :
                        <>
                        <ProfileBottom userData={userData}></ProfileBottom>
                        </>
                    }
                </div>
                    
              </>
              }
            </div>
          </div>
        </>
      }
      </>
      }
    </>
  )
    
}

export default Profile
