import React, {useState, useCallback } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from './TextInput'

const FormDialog = (props) => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [description, setDescription] = useState("")
  
  const inputName = useCallback((event) => {
    setName(event.target.value)
  },[setName]);

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  },[setEmail]);

  const inputDescription = useCallback((event) => {
    setDescription(event.target.value)
  },[setDescription]);

    return (
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">お問い合わせフォーム</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextInput 
            label={"お名前（必須）"} multiline={false} rows={1} value={name} type={"text"} onChange={inputName}
            />
            <TextInput 
            label={"メールアドレス（必須）"} multiline={false} rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <TextInput 
            label={"名前（必須）"} multiline={true} rows={5} value={description} type={"text"} onChange={inputDescription}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={props.handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default FormDialog
