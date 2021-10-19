import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { v4 as uuidv4 } from 'uuid'; // For giving unique id we use uuid. So we will give this unique id to each post
// in Post Collection as pid
import LinearProgress from '@material-ui/core/LinearProgress';
import { storage, database } from '../firebase'
const useStyles = makeStyles((theme) => ({

}));
function UploadFile(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const types = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];

    const onChange = (e) => {

        let file = e.target.files[0]; // e.?target.?files[0];

        console.log(file);

        if (file == null) {
            setTimeout(() => {
                setError("Please Select A File!");
            }, 2000);
            return;
        }
        // Now checking the type of File if its type exists in types[] or not
        if (types.indexOf(file.type) == -1) {
            setError("Please Select A Video File!");
            setTimeout(() => {
                setError("");
            }, 2000);
            return;
        }
        // Now checking if the size of File is less than 50 MB
        if ((file.size) / (1024 * 1024) > 50) { // file.size => present in bits.
            // file.size / (1024 * 1024) => converting into MB
            setError("The Selected File is too Big!");
            setTimeout(() => {
                setError("");
            }, 2000);
            return;

        }

        const id = uuidv4(); // This id will be used as pid for each post in Post Collection

        const uploadTaskListener = storage.ref(`/posts/${props.userData.userId}/${file.name}`).put(file);
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

        function fn3() {
            setLoading(true); // Waiting for the file to get uploaded. So show loading on the screen

            uploadTaskListener.snapshot.ref.getDownloadURL().then((downloadUrl) => {
                let obj = {
                    comments: [],
                    likes: [],
                    postId: id,
                    postUrl: downloadUrl,
                    userName: props?.userData?.username,
                    userProfile: props?.userData?.profileUrl,
                    userId: props?.userData?.userId,
                    createdAt: database.getCurrentTimeStamp()
                }
                // docRefId is basically an object which contains the id of document in posts collection
                database.posts.add(obj).then(async (docRefId) => {  // Here we have used 'add' instead of 'set' 
                    // because each time we will create a new document for the posts of a specific user 
                    // rather than overwritting the previous posts.
                    // Now we will put this 'docRefId.id' in postIds[] of the user

                    let result = await database.users.doc(props.userData.userId).update({
                        postIds: [...props.userData.postIds, docRefId.id]
                    });

                }).then(() => {
                    setLoading(false);
                }).catch((err) => {
                    setError(err);
                    setTimeout(() => { setError('') }, 2000);
                });

            });
        }

    }
    return (
        <>
            {
                error != null ? <Alert severity="error">{error}</Alert> : <>
                    <input
                        color='primary'
                        type='file'
                        onChange={onChange}
                        id='icon-button-file'
                        style={{ display: 'none' }}
                    />
                    <label htmlFor='icon-button-file'>
                        <Button disabled={loading} variant="outlined" component='span' className={classes.button}
                            size='medium' color="primary">
                            Upload
                        </Button>

                    </label>
                    {loading ? <LinearProgress color='secondary' style={{ marginTop: '6%' }} /> : <></>}
                </>
            }
        </>
    )
}

export default UploadFile
