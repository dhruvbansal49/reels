import React, { useContext, useState, useEffect } from 'react'
import Header from '../Material UI/Header'
import { AuthContext } from '../Context/AuthProvider'
import { database } from '../firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
// import IntersectionApi from './IntersectionApi';
import UploadFile from './UploadFile';

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
import Button from '@material-ui/core/Button';

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


import { useHistory } from 'react-router-dom';



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
  
  profilecontainer: {
    marginTop:"-9rem",
    marginRight:"-23rem",
    marginLeft:"15rem",
    height:"65vh",
    width:"20vw",
    padding:"70px 45px",
    boxShadow: "0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%)",
    backgroundColor: "white"
  },
  profileimg:{
    height:"200px",
    width:"200px",
    borderRadius:"30px"
  },
  infos: {
    padding:"14px"
  },
  headingPost: {
    width:"180px",
    paddingLeft:"35px",
    textTransform: "uppercase",
    color: "#5b9bd1",
    fontSize: "15px",
    fontWeight: "800",
  },
  subHead: {
    color: "#5a7391",
    fontSize: "13.5px",
    fontWeight: "600",
    paddingLeft:"43px"
  },
  subHeadEmail: {
    color: "#5a7391",
    fontSize: "13.5px",
    fontWeight: "600",
    width:"15vw"
  },
  postBtn:{
    display:"flex",
    justifyContent:"center",
    alignContent:"center",
  }
}));

function FrontProfile({ userData }) {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();

  const history = useHistory();

  const handleProfile = async () => {
    history.push("/profile")
    // setAnchorEl(null);
  };

  // useEffect(() => {  // Here we are basically using the 2nd variation of useEffect ie. page will be re-rendered
  //   // whenever, currentUser changes.
  //   // Also we have attached -> onSnapshot() method in order to track the changes done by currentUser such
  //   // as- changing his profile image etc
  //   const unsub = database.users.doc(currentUser.uid).get().then((doc) => {

  //     //console.log(doc.data());
  //     setUserData(doc.data())
  //   });

  // }, [currentUser])

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
                <div className={classes.profilecontainer}> 
                <img className={classes.profileimg} src={userData.profileUrl} />
                <div className={classes.infos}>
                  <h5 className={classes.headingPost}>Name:- {userData.username}</h5>
                  
                    <h6 className={classes.subHead}> No. Of Posts:- {userData.postIds == null ? 'None' : userData.postIds.length}</h6>
                    <h6 className={classes.subHeadEmail}>Email:- {userData.email}</h6>
                  <br></br>
                  <div className={classes.postBtn} >
                  <UploadFile userData={userData}/>
                  <Button variant="outlined" color="secondary" size='medium' style={{marginBottom:"0.5rem", left:"15px"}} onClick={handleProfile}>Profile</Button>
                  {/* <h4 style={{marginLeft:53}}>Currently No Posts!</h4> */}
                  </div>
                </div>
                </div>
                </>
      }
    </>
  )
    
}

export default FrontProfile
