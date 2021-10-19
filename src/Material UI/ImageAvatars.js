import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import clsx from 'clsx'; // Use clsx to add multiple classes

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    // height: 30,
    // width: '100%',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  }
}));

export default function ImageAvatars(props) {
  const classes = useStyles();
  const url=props.source;
  console.log(url);
  return (
    <div className={classes.root}>
      <Avatar alt="Remy Sharp" src={url}  className={classes.small}/>
    </div>
  );
}