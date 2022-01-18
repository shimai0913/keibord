import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Draggable from 'react-draggable'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Input from '@mui/material/Input'
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import * as React from 'react'
// import { db } from 'common/Firebase'
// import { collection, getDocs } from 'firebase/firestore'

const Container = styled(Box)`
  background: #F4F7FE;
`

const Batch = styled(Box)`
  width: 60px;
  height: 60px;
  font-size: 0.5rem;
  color: #fff;
  // background: #1A1667;
  border-radius: 50%;
  text-align: center;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`

const HorseName = styled.div`
  width: 100%;
`

const StyledInput = styled(Input)`
  color: #fff !important;
  font-size: 0.5rem !important;
  & input {
    text-align: center;
  }
`

export const Home = () => {
  const [batches, setBatches] = useState([
    {
      name: 'コントレイル',
      x: 100,
      y: 100,
      editMode: false
    },
    {
      name: 'うま',
      x: 100,
      y: 100,
      editMode: false
    },
  ])

  useEffect(() => {
    console.log('batches: ', batches)
  }, [batches])

  const onDrag = (e, data) => {
    // console.log('e: ', e)
    // console.log('data: ', data)
  }

  const createBatch = () => {
    const newHorse = {
      name: 'うま',
      x: 100,
      y: 100,
      editMode: false,
    }
    setBatches([...batches, newHorse])
  }

  const editModeOn = (key) => {
    setBatches(batches.map((batch, i) => {
      if (i === Number(key)) { batch.editMode = true }
      return batch
    }))
  }

  const editModeOff = (key) => {
    setBatches(batches.map((batch, i) => {
      if (i === Number(key)) { batch.editMode = false }
      return batch
    }))
  }

  const nameChange = (e, key) => {
    const val = e.target.value
    setBatches(batches.map((batch, i) => {
      if (i === Number(key)) { batch.name = val }
      return batch
    }))
  }

  return (
    <Container>
      <IconButton color="primary" onClick={createBatch}>
        <AddCircleOutlineIcon />
      </IconButton>
      <Grid container>
        {Object.keys(batches).map(key => {
          return (
            <Draggable key={key} onDrag={onDrag} onStop={()=>console.log('onStop')}>
              <Batch
                onDoubleClick={() => editModeOn(key)}
                style={{ background: batches[key].editMode ? '#4D98FF' : '#1A1667' }}
              >
                { batches[key].editMode ? (
                  <StyledInput
                    disableUnderline
                    fullWidth
                    autoFocus
                    value={batches[key].name}
                    placeholder='うま'
                    onChange={(e) => nameChange(e, key)}
                    onBlur={() => editModeOff(key)}
                  />
                ) : (
                  <HorseName>{batches[key].name}</HorseName>
                ) }
              </Batch>
            </Draggable>
          )
        })}
      </Grid>
    </Container>
  )
}
