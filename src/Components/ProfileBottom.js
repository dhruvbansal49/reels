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
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Video from './Video';
import Likes from './Likes';
import AddComment from './AddComment';
import Comments from './Comments';



import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ImageAvatars from '../Material UI/ImageAvatars';

import './ProfileBottom.css';



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
  loader: {
    position: 'absolute',
    left: '50%',
    top: '50%'
},
typo: {
    marginLeft: '2%'
},
vac: {
    marginLeft: '3.5%',
    color: '#8e8e8e',
    cursor: 'pointer'
},
dp: {
    marginLeft: '2%'
},
cc: {
    height: '50vh',
    overflowY: 'auto'
},
seeComments: {
    height: '54vh',
    overflowY: 'auto'
},
ci: {

    color: 'white',
    left: '9%',
    cursor: 'pointer'
},
mn: {
    color: 'white',


},
tmn: {
    color: 'white'
},
like: {
    color: '#e74c3c',
    cursor: 'pointer'
}
}));

function ProfileBottom({userData}) {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const classes = useStyles();

  const [openId, setOpenId] = useState(null); // We will basically compare openId with the current postId that
    // needs to be opened so as to avoid openning other posts if we have simply put a boolean true for openId 

    const handleClickOpen = (id) => {
        setOpenId(id);
    };
    const handleClose = () => {
        setOpenId(null);
    };

    useEffect(() => {
      let parr = [];
      const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
          parr = [];
          querySnapshot.forEach(doc => {
              if (doc.data().userId == userData?.userId) {
                  let obj = {
                      ...doc.data(),
                      postId: doc.id
                  };
                  parr.push(obj);
              }
          })
          setPosts(parr)
      })
      return unsub;
  }, []);
  return (
    <>
      {
      userData == null || posts==null ? <div className={classes.root}>
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={150}
          timeout={3000} //3 secs
          className={classes.progress}
        /></div> :
        <>
        
        <div className='video-container1'>
         {
           <>
              {
                posts.map((post) => (
                  <React.Fragment key={post.postId}>
                           <div class="col-lg-4 col-md-12 mb-4">
                                  <div class="embed-responsive embed-responsive-1by1">
                                    <iframe class="embed-responsive-item" src={post.postUrl} id={post.postId}></iframe>
                                    </div>

                                <div className='place'></div>
                                </div>
                            </React.Fragment> 
                ))
                }
                
                </>
          }
          </div>
        </>
      }
      </>
  )
}

export default ProfileBottom
