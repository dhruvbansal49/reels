import React,{useEffect,useState} from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {makeStyles} from '@material-ui/core/styles';
import {database} from '../firebase'

const useStyles = makeStyles({
    like:{
        left:"-90px",
        bottom:"-20px",
        color:'#e74c3c',
        cursor:'pointer',
    },
    unlike:{
        left:"-90px",
        bottom:"-20px",
        color:"black",
        cursor:'pointer',
    }
})
function Likes({userData,postData}) {
    const [like,setLike] = useState(null);
    const classes = useStyles();
    useEffect(()=>{
        let check = false;
        // Now checking whether the likes[] of that
        // particular post has the given userId present or not. If userId is present in likes[] of that post
        // then it means user has liked that post otherwise not liked that post
        for(let i=0;i<postData.likes.length;i++)
            {
                if(userData.userId==postData.likes[i].userId&&userData.profileUrl==postData.likes[i].profileImage)
                {
                    check=true;
                    break;
                }
            }
        setLike(check);
    },[postData]);

    const handleLike=async()=>{
        if(like==true)
        {
            //unlike
            let uarr = []; // Now the user who dislikes the post, then that user's 
            // userId will be removed from the likes[] of that post

            for(let i=0;i<postData.likes.length;i++)
            {
                if(userData.userId!=postData.likes[i].userId&&userData.profileUrl!=postData.likes[i].profileImage)
                uarr.push(postData.likes[i]);
            }
         
            await database.posts.doc(postData.postId).update({
                likes:uarr
            })
        }
        else{
            //like
            let obj={
                "userId":userData.userId,
                "profileImage":userData.profileUrl
            };
            let uarr = []; // After the user clicks on heart, then we will put that
            // user's userId into the likes[] of that post
            for(let i=0;i<postData.likes.length;i++)
            uarr.push(postData.likes[i]);

            uarr.push(obj);

            await database.posts.doc(postData.postId).update({
                likes:uarr
            });
        }
    }
    console.log(postData.likes);

 
    return (
        <div>
            {
                like!=null?
                <>
                {like==false?<FavoriteIcon style={{ fontSize: 25 }} className={`${classes.unlike} icon-styling`} onClick={handleLike} /> :
                <FavoriteIcon style={{ fontSize: 25 }} className={`${classes.like} icon-styling`} onClick={handleLike} />}
                </>
                :<></>
            }
        </div>
    )
}

export default Likes