import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles(() => (
  createStyles({
    "button": {
      border: "1px solid orange",
      color: "orange",
      fontWeight: 600,
      marginBottom: 8,
      "&:hover": {
        backgroundColor: "orange",
        color: "white"
      }
    }
  })
));

const Answer = (props) => {
  const classes = useStyles()
  return (
     <Button className={classes.button} variant="ourlined" onClick={() => props.select(props.content, props.nextId)}>{props.content}</Button>
  )
}

export default Answer
