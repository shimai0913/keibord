/* eslint no-unused-vars: 0 */
import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Draggable from 'react-draggable'
import firebase from 'firebase/compat/app'
import { db } from 'common/Firebase'
import { bordWidth, bordHeight, badgeSize } from 'common/theme/index'
import FieldImg from 'images/fieldImage.png'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Input from '@mui/material/Input'
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const Container = styled(Box)`
  witdh: ${bordWidth}px;
  height: ${bordHeight}px;
  background: #F4F7FE;
  position: relative;
`

const Badge = styled(Box)`
  width: ${badgeSize}px;
  height: ${badgeSize}px;
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

const TrashArea = styled(Box)`
  width: ${bordWidth * 0.1}px;
  height: ${bordWidth * 0.1}px;
  padding: 1rem;
  border: 1px dashed #000;
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
`
export function Room (roomId) {
  console.log(roomId.location)
  const draggableRef = useRef(false)
  const isDragRef = useRef(false)
  const [nameText, setNameText] = useState('')
  const [horseBadges, setHorseBadges] = useState({})

  useEffect(() => {
    db.collection('horses').orderBy('createdAt').onSnapshot((snapshot) => {
      const obj = {}
      snapshot.forEach((doc) => {
        obj[doc.id] = doc.data()
      })
      setHorseBadges(obj)
    })
  }, [])

  const onDrag = () => {
    isDragRef.current = true
  }

  const onStop = async (event, data, key) => {
    if (isDragRef.current) {
      if (onRemove(event.x, event.y)) {
        deleteBadge(key)
      } else {
        const newObject = {
          name: horseBadges[key].name,
          x: data.x,
          y: data.y,
          editMode: false
        }
        setHorseBadges({ ...horseBadges, [key]: newObject })
        await db.collection('horses').doc(key).update(newObject).then(() => {
          // pass
        }).catch((error) => {
          console.error('error: ', error)
        })
      }
    }
    isDragRef.current = false
  }

  const onRemove = (x, y) => {
    if (Math.floor(bordWidth * 0.9) - (badgeSize / 2) < x) {
      if (Math.floor(bordHeight - (bordWidth * 0.1)) - (badgeSize / 2) < y) {
        return true
      }
    }
    return false
  }

  const deleteBadge = (key) => {
    db.collection('horses').doc(key).delete()
  }

  const createBadge = () => {
    const badgesesLength = Object.keys(horseBadges).length
    if (badgesesLength < 18) {
      const newHorseData = {
        name: 'うま',
        x: 0,
        y: 0,
        editMode: false,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date())
      }
      db.collection('horses').add(newHorseData).then((docRef) => {
        setHorseBadges({ ...horseBadges, [docRef.id]: newHorseData })
      }).catch((error) => {
        console.error('error: ', error)
      })
    }
  }

  const editModeOn = (key) => {
    const newObject = {
      name: horseBadges[key].name,
      x: horseBadges[key].x,
      y: horseBadges[key].y,
      editMode: true
    }
    setHorseBadges({ ...horseBadges, [key]: newObject })
    setNameText(horseBadges[key].name)
  }

  const editModeOff = async (key) => {
    const newObject = {
      name: nameText,
      x: horseBadges[key].x,
      y: horseBadges[key].y,
      editMode: false
    }
    setHorseBadges({ ...horseBadges, [key]: newObject })
    setNameText('')
    await db.collection('horses').doc(key).update(newObject).then(() => {
      // pass
    }).catch((error) => {
      console.error('error: ', error)
    })
  }

  const handleChange = (e) => {
    const val = e.target.value
    setNameText(val)
  }

  return (
    <Container>
      <Card>
        <CardMedia
          component='img'
          image={FieldImg}
        />
      </Card>
      <IconButton color='primary' onClick={createBadge}>
        <AddCircleOutlineIcon />
      </IconButton>
      <Grid container>
        {Object.entries(horseBadges).map(([key, horseData]) => {
          return (
            <Draggable
              key={key}
              ref={draggableRef}
              position={{
                x: horseData.x,
                y: horseData.y
              }}
              onDrag={onDrag}
              onStop={(event, data) => onStop(event, data, key)}
            >
              <Badge
                ref={isDragRef}
                onDoubleClick={() => editModeOn(key)}
                style={{ background: horseData.editMode ? '#4D98FF' : '#1A1667' }}
              >
                {horseBadges[key].editMode ? (
                  <StyledInput
                    disableUnderline
                    fullWidth
                    autoFocus
                    value={nameText}
                    placeholder='うま'
                    onChange={handleChange}
                    onBlur={() => editModeOff(key)}
                  />
                ) : (
                  <HorseName>{horseData.name}</HorseName>
                )}
              </Badge>
            </Draggable>
          )
        })}
      </Grid>
      <TrashArea component='span'>
        <DeleteOutlineIcon color='primary' fontSize='large' sx={{ m: 'auto' }} />
      </TrashArea>
    </Container>
  )
}
