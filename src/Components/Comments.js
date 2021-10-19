import React,{useState,useEffect} from 'react'
import { CircularProgress } from '@material-ui/core';
import ImageAvatars from '../Material UI/ImageAvatars'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { database } from '../firebase';
import './Comments.css'
const useStyles = makeStyles((theme) => ({
  
}));
function Comments({userData, postData=null}) { // meaning null will be assigned to postData, if no value is
  // there for postData
    const classes = useStyles();

    const[comments,setComments]=useState(null); // comments will be an array of comment

    useEffect(async ()=>{
        let arrs=[];
        for(let i=0;i<postData.comments.length;i++)
        {
          let comment_id=postData.comments[i];
          let comment_data=await database.comments.doc(comment_id).get();
          arrs.push(comment_data.data());
        }

        setComments(arrs);
    },[postData]);
    
    
  return (
    <>
    {
      comments==null?<CircularProgress></CircularProgress> :
      comments.map((comment,index)=>(
        <div key={index} className="comment-div">
          <ImageAvatars source={comment.profileUrl} ></ImageAvatars>
          <p><span style={{fontWeight:'bold',display:'inline-block',marginTop:10,fontSize:15}} >{comment.userName}</span>&nbsp;&nbsp;{comment.text}</p>
        </div>
      ))
    }
    </>
  );
}

export default Comments
