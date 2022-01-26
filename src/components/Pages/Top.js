import React, { useState } from 'react'
import styled from 'styled-components'
import BgImg from 'images/room_background.jpg'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { bordWidth, bordHeight } from 'common/theme/index'
import { db } from 'common/Firebase'
import firebase from 'firebase/compat/app'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
const Container = styled(Box)`
  witdh: ${bordWidth}px;
  height: ${bordHeight}px;
  background: #F4F7FE;
  position: relative;
`
const StyledCardMedia = styled(CardMedia)`
  position: fixed;
  width: 100%;
`
const StyledCard = styled(Card)`
  position: fixed;
  top: 38%;
  left: 42%;
  padding: 2rem;
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
  return (
    <Container>
      <Card>
        <StyledCardMedia
          component='img'
          image={BgImg}
        />
      </Card>
      <StyledCard>
        <Grid>{viewRoomId}</Grid>
        <Button variant="contained" onClick={createRoom}>ルーム作成</Button>
      </StyledCard>
    </Container>
  )
}
