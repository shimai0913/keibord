import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import firebase from 'firebase/compat/app'
// common
import { db } from 'common/Firebase'
import { zeroPadding, sleep } from 'common/BaseFunc'
import { screenHeight } from 'common/theme/index'
// components
import EnterRoomDialog from './EnterRoomDialog'
// images
import BgImg from 'images/horse.jpg'
// mui
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LoadingButton from '@mui/lab/LoadingButton'
import BedroomBabyOutlinedIcon from '@mui/icons-material/BedroomBabyOutlined'

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

export const Top = () => {
  const roomsRef = useRef(db.collection('rooms'))
  const [loading, setLoading] = useState(false)
  const [roomId, setRoomId] = useState(null)
  const [notApplicableFlag, setNotApplicableFlag] = useState(false)
  const [closeRoomFlag, setCloseRoomFlag] = useState(false)
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
      if (!doc.exists) {
        setNotApplicableFlag(true)
        setTimeout(function () {
          setNotApplicableFlag(false)
        }, 3000)
        setLoading(false)
        return
      }
      if (!doc.data().open) {
        setLoading(false)
        setCloseRoomFlag(true)
        setTimeout(function () {
          setCloseRoomFlag(false)
        }, 3000)
        return
      }
      setLoading(false)
      navigate(`/Room/${roomId}`, { state: { roomId: roomId } })
    } catch (error) {
      console.error('error:', error)
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
          <EnterRoomDialog enterRoom={enterRoom} notApplicableFlag={notApplicableFlag} closeRoomFlag={closeRoomFlag} />
        </Grid>
        <Grid container justifyContent='flex-end'>
        </Grid>
      </CenterBox>
    </Container>
  )
}
