import React, { useState } from 'react'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
// import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import EnterRoomDialogErr from './EnterRoomDialogErr'
const StyledDialogContent = styled(DialogContent)`
  height: 50px;
  display: flex;
  padding-bottom: 40px!important;
`
const StyledTextField = styled(TextField)`
  height: 50px;
  width: 50px;
  margin-right: 1rem!important;
`
const EnterRoomDialog = (props) => {
  const [open, setOpen] = useState(false)
  const [inputErrFlag, setInputErrFlag] = useState(false)
  const { enterRoom, notApplicableFlag, closeRoomFlag } = props
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const changeField = (event) => {
    const regex = /^\d{1}$/
    const val = event.target.value
    let normalFlag = true
    if (val !== '') {
      normalFlag = regex.test(val)
      !normalFlag ? setInputErrFlag(true) : setInputErrFlag(false)
      setTimeout(function () {
        setInputErrFlag(false)
      }, 3000)
    }
    if (event.target.id.slice(-1) === '6' && val !== '') {
      if (normalFlag) {
        const selectedRoomId = String(document.getElementById('input1').value) + String(document.getElementById('input2').value) + String(document.getElementById('input3').value) + String(document.getElementById('input4').value) + String(document.getElementById('input5').value) + String(document.getElementById('input6').value)
        enterRoom(selectedRoomId)
      }
    } else {
      const next = val === '' ? Number(event.target.id.slice(-1)) - 1 : Number(event.target.id.slice(-1)) + 1
      if (normalFlag === true) {
        document.getElementById('input' + next).focus()
      }
    }
  }
  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant='contained'
        color='secondary'
        size='large'
        sx={{ m: 1 }}
      >
        入室
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ルームIDを入力
        </DialogTitle>
        <EnterRoomDialogErr inputErrFlag={inputErrFlag} notApplicableFlag={notApplicableFlag} closeRoomFlag={closeRoomFlag} />
        <StyledDialogContent>
          <StyledTextField
            required
            id="input1"
            color='secondary'
            inputProps={{ maxLength: 1 }}
            onChange={changeField}
          />
          <StyledTextField
            required
            id="input2"
            color='secondary'
            inputProps={{ maxLength: 1 }}
            onChange={changeField}
          />
          <StyledTextField
            required
            id="input3"
            color='secondary'
            inputProps={{ maxLength: 1 }}
            onChange={changeField}
          />
          <StyledTextField
            required
            id="input4"
            color='secondary'
            inputProps={{ maxLength: 1 }}
            onChange={changeField}
          />
          <StyledTextField
            required
            id="input5"
            color='secondary'
            inputProps={{ maxLength: 1 }}
            onChange={changeField}
          />
          <StyledTextField
            required
            id="input6"
            color='secondary'
            inputProps={{ maxLength: 1 }}
            onChange={changeField}
          />
        </StyledDialogContent>
      </Dialog>
    </>
  )
}
export default EnterRoomDialog
