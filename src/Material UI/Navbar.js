import React,{useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Signup from '../Components/Signup';
import Profile from '../Components/Profile';
import HomeIcon from '@material-ui/icons/Home';
import { height } from '@material-ui/system';
import { useHistory } from 'react-router-dom';


import ImageAvatars from './ImageAvatars';
// import Avatar from '@material-ui/core/Avatar';


import { AuthContext } from '../Context/AuthProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color:"black"
  },
  title: {
    flexGrow: 1,
    color:"black"
  },
  appBar:{
    // backgroundImage: "linear-gradient( 135deg, #F0FF00 10%, #58CFFB 100%)",
      height:"5rem",
      backgroundColor:"skyblue"

  },
  iconBtn:{
    position: "relative",
    right: "200px",
  },
  iconHome:{
    position: "relative",
    right: "320px",
  },
  header:{
    height: "50px",
    width: "175px",
    margin: "auto",
    position: "relative",
    top:"0.5rem",
    left: "40px"
  },
  instaHeading:{
  fontFamily: 'Pacifico',
  fontWeight: "bolder",
  fontSize: "45px",
  textAlign: "center",
  color: "#ce2fac",
  marginTop:"-12px"
  }
}));


function Navbar({...userData}) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  
  const { logout,currentUser } = useContext(AuthContext);


  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleHome = (event) => {
    history.push("/")
  };

  const handleProfile = async () => {
    history.push("/profile")
    // setAnchorEl(null);
  };
  const handleClose = async () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={classes.root}>
      
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          {/* <Typography variant="h6" className={classes.title}>
            Instagram
          </Typography> */}
          <div className={classes.header}>
          <div className={classes.instaHeading}>Reels</div>
              {/* <img src="https://i.imgur.com/zqpwkLQ.png" /> */}
                </div>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                className={classes.iconBtn}
              >
                {/* <AccountCircle className={classes.accountCircle}  /> */}
                <ImageAvatars  className={classes.accountCircle} source={{...userData}.userData.profileUrl}></ImageAvatars>
                {/* <Avatar src={{...userData}.userData.profileUrl}></Avatar> */}
              </IconButton >
              <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleHome}
              color="inherit"
              className={classes.iconHome} >
              <HomeIcon style={{color:"black",fontSize:"30px"}}></HomeIcon>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar
