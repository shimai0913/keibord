import React, { useState } from 'react'
import styled from 'styled-components'
import BgImg from 'images/room_background.jpg'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import TextField from '@mui/material/TextField'
import { bordWidth, bordHeight } from 'common/theme/index'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
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
const StyledStack = styled(Stack)`
  margin-top: 1rem;
`
const ErrTypography = styled(Typography)`
  color: red;
`

export const Top = () => {
  const [roomId, setRoomId] = useState('')
  const [errMessage, setErrMessage] = useState('')
  const valChange = (e) => {
    const val = e.target.value
    setRoomId(val)
  }
  const clearRoomId = () => {
    setRoomId('')
    setErrMessage('')
  }
  const decisionRoomId = () => {
    const regex = /^\d{6}$/
    const result = regex.test(roomId)
    if (result) {
      //  validation通過
      setErrMessage('')
    } else {
      setErrMessage('6桁半角数字で設定してください。')
    }
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
        <Typography>ルーム作成<br />6桁のルームIDを設定してください</Typography>
        <TextField value={roomId} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={valChange} label={'ルームID'} margin="dense" />
        <ErrTypography>{errMessage}</ErrTypography>
        <StyledStack spacing={2} direction="row">
          <Button variant="outlined" onClick={clearRoomId}>クリア</Button>
          <Button variant="contained" onClick={decisionRoomId}>作成</Button>
        </StyledStack>
      </StyledCard>
    </Container>
  )
}
