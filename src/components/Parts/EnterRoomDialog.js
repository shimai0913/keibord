import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
// common
// components
// images
// mui
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import BedroomBabyOutlinedIcon from '@mui/icons-material/BedroomBabyOutlined'

const ErrAlert = styled(Alert)`
  margin: auto;
`

const StyledTextField = styled(TextField)`
  height: 50px;
  width: 50px;
  margin-right: 1rem! important;
`

const EnterRoomDialog = ({ open, onClose, enterRoom }) => {
  const initial = [null, null, null, null, null, null]
  const [targetRoomId, setTargetRoomId] = useState(initial)
  const [values, setValues] = useState(initial)
  const [forcus, setForcus] = useState(0)
  const [err, setErr] = useState(false)
  const buttonRef = useRef(null)

  useEffect(() => {
    const roomId = values.join('')
    setTargetRoomId(roomId)
  }, [values])

  useEffect(() => {
    if (targetRoomId.length === 6 && buttonRef.current) buttonRef.current.focus()
  }, [targetRoomId])

  const changeField = (event, index) => {
    const newVal = event.target.value
    if (isNaN(newVal)) return
    setValues(values.map((value, i) => (index === i ? newVal : value)))
    setForcus(index + 1)
  }

  const enterTargetRoom = async (roomId) => {
    if (await enterRoom(roomId)) onClose()
    setErr(true)
  }

  return (
    <Dialog open={open}>
      <DialogTitle>ルームIDを入力</DialogTitle>
      {err && <ErrAlert variant="outlined" severity="error">ルームが存在しません。</ErrAlert>}
      <DialogContent>
        {values.map((value, index) => (
          <StyledTextField
            key={index}
            value={value || ''}
            inputRef={input => input && index === forcus && input.focus()}
            color='secondary'
            inputProps={{ maxLength: 1 }}
            onChange={(e) => changeField(e, index)}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          ref={buttonRef}
          variant='contained'
          color='secondary'
          size='large'
          onClick={() => enterTargetRoom(targetRoomId)}
          endIcon={<BedroomBabyOutlinedIcon />}
          disabled={targetRoomId.length !== 6}
        >
          決定
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default EnterRoomDialog
