import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import BgImg from 'images/horse.jpg'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { bordWidth, bordHeight } from 'common/theme/index'
import { db } from 'common/Firebase'
import firebase from 'firebase/compat/app'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import LoginIcon from '@mui/icons-material/Login'
const Container = styled(Box)`
  witdh: ${bordWidth}px;
  height: ${bordHeight}px;
  background: #F4F7FE;
  position: relative;
`
const StyledCardMedia = styled(CardMedia)`
  position: fixed;
  width: 100%;
  filter: brightness(70%);
  drop-shadow(3px 3px 5px #000);
  filter: opacity(80%);
`
const StyledCard = styled(Card)`
  padding: 0;
  width: 200px;
  box-shadow: 20px 20px 15px -10px!important;
  margin-right: 1rem;
`
const StyledButton = styled(Button)`
  width: 200px;
  height: 100px;
`
const EntryRoomButton = styled(Button)`
  height: 56px;
  margin-left: 2rem!important;
`
const FixedGrid = styled(Grid)`
  position: fixed;
  top: 10%;
  left: 55%;
`
const EnterRoomGrid = styled(Grid)`
  margin-top: 2rem;
  padding: 1rem 1rem 1rem 0;
  border-radius: 10px;
`
const FlexGrid = styled(Grid)`
  display: flex;
`
const StyledAlert = styled(Alert)`
  margin-top: 3rem;
  with: auto;
`
export const Top = () => {
  const [viewRoomId, setViewRoomId] = useState('')
  const createRoom = () => {
    let roomId = '000000'
    db.collection('rooms').limit(1).orderBy('createdAt', 'desc').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        roomId = Number(doc.id) + 1
        roomId = ('000000' + roomId).slice(-6)
      })
      db.collection('rooms').doc(roomId).set({ createdAt: firebase.firestore.Timestamp.fromDate(new Date()) })
      db.collection('rooms').doc(roomId).collection('houses').doc('houses').set({ createdAt: firebase.firestore.Timestamp.fromDate(new Date()) })
      setViewRoomId(`ルームID${roomId}でルームを作成しました。`)
    })
  }
  const closeNotification = () => {
    setViewRoomId('')
  }
  const [roomId, setRoomId] = useState('')
  const [errFlag, setErrFlag] = useState(false)
  const [disabledFlag, setDisabledFlag] = useState(true)
  const valChange = (e) => {
    const val = e.target.value
    const regex = /^\d{6}$/
    const result = regex.test(val)
    if (result) {
      //  validation通過
      setErrFlag(false)
      setDisabledFlag(false)
    } else {
      setErrFlag(true)
      setDisabledFlag(true)
    }
    setRoomId(val)
  }
  const clearRoomId = () => {
    setRoomId('')
    setErrFlag(false)
    setDisabledFlag(true)
  }
  // const to = {
  //   pathname: '/room',
  //   state: { data: roomId }
  // }
  return (
    <Container>
      <Card>
        <StyledCardMedia
          component='img'
          image={BgImg}
        />
      </Card>
      <FixedGrid>
        <FlexGrid>
          <StyledCard>
            <StyledButton variant="contained" onClick={createRoom}>ルーム作成</StyledButton>
          </StyledCard>
          {viewRoomId !== '' &&
            <StyledAlert variant="filled" severity="success" onClose={closeNotification} >
              {viewRoomId}
            </StyledAlert>
          }
        </FlexGrid>
        <EnterRoomGrid>
          <TextField
            value={roomId}
            error={Boolean(errFlag)}
            inputProps={{ maxLength: 6, inputMode: 'numeric', pattern: '[0-9]*' }}
            label="ルームID"
            variant="outlined"
            onChange={valChange}
          />
          <EntryRoomButton
            variant="contained"
            size="large"
            color="info"
            onClick={clearRoomId}>
            クリア
          </EntryRoomButton>
          <Link to={{
            pathname: '/room',
            state: { key: roomId }
          }}>
            <EntryRoomButton
              variant="contained"
              color="success"
              startIcon={<LoginIcon />}
              disabled={Boolean(disabledFlag)}>
              入室
            </EntryRoomButton>
          </Link>
        </EnterRoomGrid>
      </FixedGrid>
    </Container>
  )
}
