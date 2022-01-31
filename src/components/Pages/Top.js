import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import firebase from 'firebase/compat/app'
// common
import { db } from 'common/Firebase'
import { zeroPadding, sleep } from 'common/BaseFunc'
import { screenHeight } from 'common/theme/index'
// components
// images
import BgImg from 'images/horse.jpg'
// mui
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import BedroomBabyOutlinedIcon from '@mui/icons-material/BedroomBabyOutlined'
import Alert from '@mui/material/Alert'

const Container = styled(Grid)`
  width: 100%;
  height: ${screenHeight}px;
  background: #9DBCBE;
  position: relative;
  background-image: url(${BgImg});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  z-index: 0;
  & :before {
    content: '';
    background: inherit;
    z-index: -1;
    filter: blur(5px);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`

const CenterBox = styled(Box)`
  width: 80%;
  height: 80%;
  padding: 6%;
  // padding-bottom: 30%;
  // padding-left: 50%;
  box-sizing: border-box;
  border: 4px rgba(29,29,27,.15) solid;
  box-shadow: inset 0px 2px 0px 0px rgb(255 255 255 / 15%), 0px 3px 0px 0px rgb(255 255 255 / 15%);
  border-radius: 12px;
  background-image: url(${BgImg});
  background-repeat: no-repeat;
  background-position: 100% 100%;
  background-size: cover;
`
const ErrAlert = styled(Alert)`
  max-width: 300px;
  float: right;
  margin-bottom: 1rem;
  margin-top: 1rem;
`

export const Top = () => {
  const roomsRef = useRef(db.collection('rooms'))
  const [loading, setLoading] = useState(false)
  const [roomId, setRoomId] = useState(null)
  const [inputRoomId, setInputRoomId] = useState(null)
  const [roomIdErrFlag, setRoomIdErrFlag] = useState(false)
  const [entryButtonFlag, setEntryButtonFlag] = useState(true)
  const [notApplicableFlag, setNotApplicableFlag] = useState(false)
  const navigate = useNavigate()

  const createRoom = async () => {
    try {
      setLoading(true)
      await sleep(3000)
      const querySnapshot = await roomsRef.current.limit(1).orderBy('createdAt', 'desc').get()
      const newRoomId = querySnapshot.docs.map(doc => zeroPadding(Number(doc.id) + 1, 6)).join(',')
      const newData = {
        open: true,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date())
      }
      setRoomId(newRoomId)
      roomsRef.current.doc(newRoomId || '000001').set(newData)
    } catch (error) {
      console.error('error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (roomId) {
      enterRoom(roomId)
    }
  }, [roomId])

  const enterRoom = async (roomId) => {
    if (!roomId) return
    try {
      setLoading(true)
      const doc = await roomsRef.current.doc(roomId).get()
      setLoading(false)
      if (doc.exists && doc.data().open) {
        navigate(`/Room/${roomId}`, { state: { roomId: roomId } })
      } else {
        setNotApplicableFlag(true)
      }
    } catch (error) {
      console.error('error:', error)
    }
  }
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
    <Container container justifyContent='center' alignItems='center'>
      <CenterBox>
        <Grid container justifyContent='flex-end'>
          <LoadingButton
            variant='contained'
            color='secondary'
            size='large'
            onClick={createRoom}
            loading={loading}
            disabled={loading}
            loadingPosition='end'
            endIcon={<BedroomBabyOutlinedIcon />}
            sx={{ m: 1 }}
          >
            ルーム作成
          </LoadingButton>
        </Grid>
        {notApplicableFlag &&
          <ErrAlert variant="outlined" severity="error">
            ルームが存在しません。
          </ErrAlert>
        }
        <Grid container justifyContent='flex-end'>
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
        </Grid>
      </CenterBox>
    </Container>
  )
}
