import React, { useState } from 'react'
import styled from 'styled-components'
// common
// components
// images
import Hanshin1600 from 'images/racecourseHanshin1600.png'
import Tokyo2400 from 'images/racecourseTokyo2400.png'
// mui
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const CourseMap = {
  阪神競馬場1600m: Hanshin1600,
  東京競馬場2400m: Tokyo2400
}

const TriangleLeft = styled.div`
  width: 0;
  height: 0;
  border-top: 30px solid transparent;
  border-right: 30px solid #000;
  border-bottom: 30px solid transparent;
`

const TriangleRight = styled.div`
  width: 0;
  height: 0;
  border-top: 30px solid transparent;
  border-left: 30px solid #000;
  border-bottom: 30px solid transparent;
`

const TitleBar = styled(Select)`
  width: 80%;
  background: #000000;
  text-align: center;
  border-radius: 0 !important;
  & div {
    color: #ffffff;
    font-size: 32px;
    font-weight: bold;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const ArrowDownIcon = styled(KeyboardArrowDownIcon)`
  position: fixed;
  right: 12%;
`

export const Bord = () => {
  const [raceTitle, setRaceTitle] = useState('阪神競馬場1600m')

  return (
    <React.Fragment>
      <Grid container justifyContent='center'>
        <TriangleLeft />
        <TitleBar
          autoWidth
          value={raceTitle}
          onChange={(e) => setRaceTitle(e.target.value)}
          IconComponent={() => <ArrowDownIcon color='primary' />}
        >
          <MenuItem value={'阪神競馬場1600m'}>阪神競馬場1600m</MenuItem>
          <MenuItem value={'東京競馬場2400m'}>東京競馬場2400m</MenuItem>
        </TitleBar>
        <TriangleRight />
      </Grid>
      <Card>
        <CardMedia
          component='img'
          image={CourseMap[raceTitle]}
        />
      </Card>
    </React.Fragment>
  )
}
