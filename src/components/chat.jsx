import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Customer from '../assets/mask_man1_normal.png'
import Sellsperson from '../assets/kaisya_desk1_syachou_young_man.png'

const Chat = (props) => {
  const isQuestion = (props.type === 'question')
  const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse'
  return (
    <ListItem className={classes}>
        <ListItemAvatar>
          {isQuestion ? (
            <Avatar alt="Remy Sharp" src={Sellsperson} />//true
          ) : (
            <Avatar alt="Remy Sharp" src={isQuestion} />//false
          )}
        </ListItemAvatar>
        <div className="p-chat__bubble">{props.text}</div>
      </ListItem>
  )
}

export default Chat
