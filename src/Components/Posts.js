import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import Ticker from 'react-ticker';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Video from './Video';
import { database } from '../firebase';
import { AddShoppingCart } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';



import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Likes from './Likes';
import AddComment from './AddComment';
import Comments from './Comments';

import ImageAvatars from '../Material UI/ImageAvatars'

import './Posts.css'


import { Collections } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
    root: {
        // width: '100%',
        // padding: '0px'
        maxWidth: 545,
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
        height: '40vh',
        overflowY: 'auto'
    },
    ci: {
        left:"450px",
        top:"39.5rem",
        color: 'black',
        cursor: 'pointer'
    },
    mn: {
        color: 'white',


    },
    tmn: {
        color: 'white'
    },
    like: {
        top:"425px",
        left:"260px",
        color: '#e74c3c',
        cursor: 'pointer'
    },
    hrtPost : {
        position:"relative",
      right:"-200rem"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }

}));
function Posts({ userData }) {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [openId, setOpenId] = useState(null); // We will basically compare openId with the current postId that
    // needs to be opened so as to avoid openning other posts if we have simply put a boolean true for openId 

    const handleClickOpen = (id) => {
        setOpenId(id);
    };
    const handleClose = () => {
        setOpenId(null);
    };

    const [posts, setPosts] = useState(null); // posts will be an array of objects

    const callback = (entries) => { // enteries is an array 
        entries.forEach(element => {
            //console.log(element);
            let el = element.target.childNodes[0];
            el.play().then(() => { // e1.play() is an asynchronous function which is a Promise
                //if this video is not in viewport, then pause it
                if (!el.paused && !element.isIntersecting) {
                    el.pause();  // e1.pause() is Synchronous Function        
                }
            })

        });

    }
    const observer = new IntersectionObserver(callback, { threshold: 0.85 });
    // variation of useEffect=> ComponentDidMount
    useEffect(() => {
        let posts_arr = [];
        //    Here we will attach snapshot on entire Post Collection rather than document, because if any user adds some
        //    new posts, then we want to observe the entire list of posts rather than observing 1 single post
        //    Now we will get a querySnapshot for the entire Post Collection
        //    Now sorting the posts in decreasing order of createdAt time
        const unsub = database.posts.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
            posts_arr = [] // We are emptying this array in order to avoid double copy of posts, as if a user adds
            //    some new posts, then onSnapshot will be triggered and we will be getting double copies of posts.
            //    So to avoid this, we are emptying posts_arr[]

            // querySnapshot will be a collection of documents, so iterate over it
            querySnapshot.forEach((doc) => {
                //console.log(doc.data());
                let data = { ...doc.data(), postId: doc.id }; // Using this => postId:document.id , for uniqueness
                //    if required in future
                posts_arr.push(data);
            });

            setPosts(posts_arr);
        });


        // Remember whenever we attach some listener or observer such as-onSnapshot, we also need to remove it as well
        return unsub; // Removing the listener
    }, []);

    useEffect(() => {  // Here we are basically using the 2nd variation of useEffect ie. page will be re-rendered
        // whenever, there is any change in Post.
        // Also we have attached -> onSnapshot() method in order to track the changes done in Post such
        // as- adding new post etc
        let elements = document.querySelectorAll('.videos')
        elements.forEach(el => {
            //observer.observe(el)
        });

        return () => { // Here we are adding clean up code beacause if add some new video and if we don't write this 
            // clean up code, then again 'observe' will be attached on old videos and new videos. 
            // So in order to remove 'observe' from old videos before adding new Video, we write this clean-up code
            //observer.disconnect();
        }

    }, [posts])
    return (
        <>
            <div className='place'></div>
            {posts == null ? <CircularProgress className={classes.loader} color="secondary" /> :
                <div className='video-container' id='video-container'>
                    {
                        posts.map((post, index) => (
                            <React.Fragment key={post.postId}>
                                <div className='videos'>
                                    <Card className={classes.root} style={{border: "1px solid #dfe6e9"}}>
                                                        <CardHeader
                                                            avatar={
                                                                <Avatar src={post?.userProfile} aria-label="recipe" className={classes.avatar}></Avatar>
                                                            }
                                                            title={<div style={{fontWeight:900}}>{post?.userName}</div>}
                                                            style={{border:"1px solid #dfe6e9",padding:"2 5 0 1"}}
                                                            
                                                        />
                                                        <video autoPlay={true} className='video-styles2' controls id={post.id} muted="muted" type="video/mp4" >
                                                        <source src={post.postUrl} type="video/webm" style={{backgroundImage :("https://image.freepik.com/free-vector/white-blurred-background_1034-249.jpg")}}/>
                                                    </video>
                                                        
                                                    <hr style={{ border: "none", height: "5px", color: "#ffffff", backgroundColor: "#ffffff" }} />
                                                        
                                                        <CardActions>
                                                           <Likes userData={userData} postData={post}  />{/* Passing {userData} in order to add that userId into the likes[] of post */}  
                                                            <ChatBubbleIcon onClick={() => handleClickOpen(post.postId)} className={`${classes.ci} icon-styling`} />

                                                        </CardActions>
                                                    </Card>

                                    <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={openId === post.postId}>
                                        <MuiDialogContent>
                                            <div className='dcontainer'>
                                                <div className='video-part'>
                                                    <video autoPlay={true} className='video-styles2' controls id={post.id} muted="muted" type="video/mp4" >
                                                        <source src={post.postUrl} type="video/webm" />
                                                    </video> 
                                                </div>
                                                <div className='info-part'>
                                                    <Card className={classes.root}>
                                                        <CardHeader
                                                            avatar={
                                                                <Avatar src={post?.userProfile} aria-label="recipe" className={classes.avatar}></Avatar>
                                                            }
                                                            title={<div style={{fontWeight:900}}>{post?.userName}</div>}
                                                        />

                                                        <hr style={{ border: "none", height: "2px", color: "#dfe6e9", backgroundColor: "#dfe6e9" }} />
                                                        <CardContent className={classes.seeComments}>
                                                            <Comments userData={userData} postData={post} />
                                                        </CardContent>

                                                    </Card>
                                                    <div className='extra'>
                                                        <div className='likes'>

                                                            {
                                                                post.likes.length == 0 ? <Typography className={classes.typo} variant='body2'>Liked By Nobody</Typography>
                                                                    :
                                                                    <>
                                                                        <FavoriteIcon className={`${classes.like} icon-styling`} />

                                                                        {

                                                                            post.likes.map((user) => (
                                                                                <>
                                                                                    <ImageAvatars  source={user["profileImage"]}></ImageAvatars>
                                                                                </>

                                                                            ))

                                                                        }

                                                                    </>

                                                            }

                                                        </div>
                                                        <AddComment userData={userData} postData={post} />
                                                    </div>
                                                </div>
                                            </div>
                                        </MuiDialogContent>
                                    </Dialog>
                                </div>

                                <div className='place' style={{backgroundColor: "#f8f9fa", height:"30px"}}></div>
                            </React.Fragment>
                        ))
                    }
                </div>
            }
        </>
    )
}

export default Posts