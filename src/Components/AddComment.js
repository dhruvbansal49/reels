import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './AddComment.css'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Picker from 'emoji-picker-react';
import { database } from '../firebase';
const useStyles = makeStyles((theme) => ({
    cbtn:{
        marginRight:'1%',
        marginTop:'4%'
    },
    emojiBox:{
      position:'absolute',
      bottom:'19vh',
  }
}));
function AddComment({userData, postData=null}) { // meaning null will be assigned to postData, if no value is
  // there for postData
    const classes = useStyles();

    const[text,setText]=useState('');

    const manageText=(e)=>{
        let comment=e.target.value;
        setText(comment);
    }
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [openEmoji,setOpenEmoji]=useState(false);

    const handleCommentOnEnter=(e)=>{ // Through this function we will add comment, when we click Post btn
       let comment_obj={
         text:text,
         userName:userData.username,
         profileUrl:userData.profileUrl
       };
       //console.log(comment_obj);
       database.comments.add(comment_obj).then((docRefId)=>{ // Now we will first find the id of comment using 
        // docRefId.id and then push the id in the comments[] of that post
        database.posts.doc(postData.postId).update({
         comments:[...postData.comments,docRefId.id]
        });
       }).catch((err)=>{
         console.log(err);
       });

       setText(''); // Now after adding id of comment in comments[] of that post, we will set comment text field as ''
    }
    const handleOpenEmojiBox=()=>{
      let val=!openEmoji;
      setOpenEmoji(val);
    }
    const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
      if(chosenEmoji!=null)
        setText(text+chosenEmoji.emoji);
    }
  return (
    <>
      <div className='emojibox'>
      <InsertEmoticonIcon style={{ color: "#BDBDBD", fontSize: "1.8rem",marginLeft:'0.1em',marginRight:'0.2em', marginTop:"1rem" }} onClick={handleOpenEmojiBox} />
            {                  
                  openEmoji==true?
                  <div className={classes.emojiBox}>
                  <Picker onEmojiClick={onEmojiClick} />
                  </div>:<></>
            }
      <TextField value={text} id="standard-basic" label="Add Comment" onChange={manageText} fullWidth={true}/>
      <Button onClick={handleCommentOnEnter} disabled={text==''?true:false} className={classes.cbtn} color='primary'>Post</Button>
      </div>
      </>
  );
}

export default AddComment
