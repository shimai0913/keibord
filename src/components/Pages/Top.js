import React, { useState } from 'react'
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
`
const StyledButton = styled(Button)`
  width: 200px;
  height: 100px;
`
const FixedGrid = styled(Grid)`
  position: fixed;
  top: 14%;
  left: 70%;
`
const StyledAlert = styled(Alert)`
  margin-top: 2rem;
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
      setViewRoomId(`ルームID${roomId}でルームを作成しました。`)
    })
  }
  const closeNotification = () => {
    setViewRoomId('')
  }
  return (
    <Container>
      <Card>
        <StyledCardMedia
          component='img'
          image={BgImg}
        />
      </Card>
      <FixedGrid>
        <StyledCard>
          <StyledButton variant="contained" onClick={createRoom}>ルーム作成</StyledButton>
        </StyledCard>
        {viewRoomId !== '' &&
          <StyledAlert variant="filled" severity="success" onClose={closeNotification} >
            {viewRoomId}
          </StyledAlert>
        }
      </FixedGrid>
    </Container>
  )
}
