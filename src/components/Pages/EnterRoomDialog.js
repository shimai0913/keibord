import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import BedroomBabyOutlinedIcon from '@mui/icons-material/BedroomBabyOutlined'
const EnterRoomDialog = (props) => {
  const { enterRoom, loading } = props
  const [inputRoomId, setInputRoomId] = useState(null)
  const [roomIdErrFlag, setRoomIdErrFlag] = useState(false)
  const [entryButtonFlag, setEntryButtonFlag] = useState(true)
  const changeRoomId = (e) => {
    const regex = /^\d{6}$/
    const val = e.target.value
    setInputRoomId(e.target.value)
    if (val === '') {
      setRoomIdErrFlag(false)
    } else {
      regex.test(val) ? setRoomIdErrFlag(false) : setRoomIdErrFlag(true)
      regex.test(val) ? setEntryButtonFlag(false) : setEntryButtonFlag(true)
    }
  }
  return (
    <>
      <TextField
        inputProps={{ maxLength: 6 }}
        error={roomIdErrFlag}
        onChange={changeRoomId}
        id="outlined-basic"
        label="ルームID"
        variant="outlined"
      />
      <LoadingButton
        variant='contained'
        color='primary'
        size='large'
        onClick={() => enterRoom(inputRoomId)}
        loading={loading}
        disabled={entryButtonFlag}
        loadingPosition='end'
        endIcon={<BedroomBabyOutlinedIcon />}
        sx={{ m: 1 }}
      >
        入室
      </LoadingButton>
    </>
  )
}
export default EnterRoomDialog
