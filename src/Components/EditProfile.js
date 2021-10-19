import React, { useContext, useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


import { storage, database } from '../firebase'
import './EditProfile.css'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  closeBtn: {
    borderColor: '#31BDCE',
    color: '#31BDCE',
    marginRight: '1em'
  },
  saveBtn: {
    borderColor: '#ff878d',
    color: '#ff878d',
    marginLeft: '1em'
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

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
  }
}));

export default function EditProfile({ userData }) {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setfile] = useState(userData?.profileURL);
  const [userName, setUsername] = useState(null);
  const [photo, setPhoto] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleFileSubmit = (e) => {
    const file = e.target.files[0];
    if (file != null) {
      setfile(URL.createObjectURL(file));
      setPhoto(file);
    }
  }
  const handleSave = async () => {

    if (userName != null) {
      await database.users.doc(userData?.userId).update({
        username: userName
      });
    }


    if (photo != null) {
      const uploadTaskListener = storage.ref(`/users/${userData.userId}/UpdatedImage`).put(photo);
      uploadTaskListener.on('state_changed', fn3);

      async function fn3() {
        let downloadURL = await uploadTaskListener.snapshot.ref.getDownloadURL();
        await database.users.doc(userData?.userId).update({
          profileUrl: downloadURL
        })
      }

    }
    setOpen(false);
    {
      loading ? <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={100}
        width={150}
        timeout={3000} //3 secs
        className={classes.progress}
      /> : <></>
    }
  }


  return (
    <div>
      <Button variant="outlined" color="secondary" size='medium' style={{ marginLeft: " 42rem" }} onClick={handleClickOpen}>Edit</Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit
        </DialogTitle>
        <DialogContent dividers className="main-dialog">

          <form>
            <div>
              {/* <label htmlFor=''>UserName</label> */}
              {/* <input type='text' value={name} onChange={(e) => setName(e.target.value)} className="input-1s" placeholder="Username" /> */}
              <TextField
                id="outlined-password-input"
                type="text"
                autoComplete="current-password"
                variant="outlined"
                defaultValue={userData?.username}
                value={userName} onChange={(e) => setUsername(e.target.value)} className="input-1s"
                style={{ marginBottom: 15 }} />
              <div className="overlap-text">
                {/* <label htmlFor=''>Email</label> */}
                {/* <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className="input-2s" placeholder="Email" /> */}

                {/* <label htmlFor='profile'>Profile image</label> */}
                <input type='file' accept='image/*' onChange={handleFileSubmit} className="input-2s" placeholder="Profile-Image"></input>
              </div>
            </div>
          </form>

        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Close
          </Button>
          <Button autoFocus variant="outlined" color="secondary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
