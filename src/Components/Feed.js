import React,{useContext,useState,useEffect} from 'react'
import Header from '../Material UI/Header'
import { AuthContext } from '../Context/AuthProvider'
import {database} from '../firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
// import IntersectionApi from './IntersectionApi';
import UploadFile from './UploadFile';
import './Feed.css'
import { EcoTwoTone } from '@material-ui/icons';
import { useEventCallback } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Posts from './Posts';

import FrontProfile from './FrontProfile';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
    progress:{
        position:"relative",
        top:"250px",
        left:"650px",
    }
  }));

function Feed() {
    const {currentUser} =useContext(AuthContext);
    const [userData,setUserData] = useState(null);
    const[hidden,setHidden]=useState(false);
    const classes = useStyles();
    
    useEffect(()=>{  // Here we are basically using the 2nd variation of useEffect ie. page will be re-rendered
        // whenever, currentUser changes.
        // Also we have attached -> onSnapshot() method in order to track the changes done by currentUser such
        // as- changing his profile image etc
        const unsub = database.users.doc(currentUser.uid).onSnapshot((doc)=>{
            // console.log(doc.data());
            setUserData(doc.data())
        });
    },[currentUser])
    return (
        <>
         { userData==null ? <div className={classes.root}>{/*<CircularProgress className={classes.progress} />*/}
         <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={100}
        width={150}
        timeout={3000} //3 secs
        className={classes.progress}
      /></div>:  
        <>
        <Header userData={userData}></Header>

        <div className="smallDiv" style={{height:'9.5vh'}}/>

         <div className='feed-container'>
             <div className='center'>
                 {/* <UploadFile userData={userData}/> */}
                 {/* <IntersectionApi></IntersectionApi>  */}

                <Posts userData={userData} />
             </div>
             <div className="front-profile">
              <FrontProfile userData={userData}></FrontProfile>
             </div>
         </div>


        </> 
        }
        </>
    )
}

export default Feed
