import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import firebase from 'firebase/compat/app'
import Draggable from 'react-draggable'
// common
import { db } from 'common/Firebase'
import { screenWidth, screenHeight, badgeSize } from 'common/theme/index'
// components
import { Bord } from 'components/Parts/Bord'
// images
// mui
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Input from '@mui/material/Input'
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const Container = styled(Box)`
  width: 100%;
  height: ${screenHeight}px;
  background: #F4F7FE;
  position: relative;
`

const Badge = styled(Box)`
  width: ${badgeSize}px;
  height: ${badgeSize}px;
  font-size: 0.5rem;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: fixed;
  box-shadow: inset -1px -5px 10px #DBDCFE;
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
  width: ${screenWidth * 0.1}px;
  height: ${screenWidth * 0.1}px;
  padding: 1rem;
  border: 1px dashed #000;
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
`

export const Room = () => {
  const [roomId, setRoomId] = useState(null)
  const [nameText, setNameText] = useState('')
  const [horseBadges, setHorseBadges] = useState({})
  const roomsRef = useRef(db.collection('rooms'))
  const horsesRef = useRef(null)
  const draggableRef = useRef(false)
  const isDragRef = useRef(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(async () => {
    if (!location.state) {
      navigate('/', { replace: true })
      return
    }
    setRoomId(location.state.roomId)
    getHorseBadges(location.state.roomId)
  }, [])

  useEffect(() => {
    if (roomId) {
      horsesRef.current = roomsRef.current.doc(roomId).collection('horses')
      getHorseBadges()
    }
  }, [roomId])

  const getHorseBadges = async () => {
    if (!horsesRef.current) return
    try {
      await horsesRef.current.orderBy('createdAt').onSnapshot(snapshot => {
        const obj = {}
        snapshot.forEach(doc => {
          obj[doc.id] = doc.data()
        })
        setHorseBadges(obj)
      })
    } catch (error) {
      console.error(error)
    }
  }

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
        await horsesRef.current.doc(key).update(newObject).catch((e) => console.error(e))
      }
    }
    isDragRef.current = false
  }

  const onRemove = (x, y) => {
    if (Math.floor(screenWidth * 0.9) - (badgeSize / 2) < x) {
      if (Math.floor(screenHeight - (screenWidth * 0.1)) - (badgeSize / 2) < y) {
        return true
      }
    }
    return false
  }

  const deleteBadge = (key) => {
    horsesRef.current.doc(key).delete()
  }

  const createBadge = async () => {
    const badgesesLength = Object.keys(horseBadges).length
    if (badgesesLength < 18) {
      // 初期配置x, yは乱数
      const newHorseData = {
        name: 'うま',
        x: Math.floor(Math.random() * 500),
        y: Math.floor(Math.random() * 500),
        editMode: false,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date())
      }
      const docRef = await horsesRef.current.add(newHorseData).catch((e) => console.error(e))
      setHorseBadges({ ...horseBadges, [docRef.id]: newHorseData })
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
      name: nameText || 'うま',
      x: horseBadges[key].x,
      y: horseBadges[key].y,
      editMode: false
    }
    setHorseBadges({ ...horseBadges, [key]: newObject })
    setNameText('')
    await horsesRef.current.doc(key).update(newObject).catch((e) => console.error(e))
  }

  const handleChange = (e) => {
    const val = e.target.value
    if (val.length > 9) return
    setNameText(val)
  }

  return (
    <Container>
      <Bord />
      <IconButton color='secondary' onClick={createBadge}>
        <AddCircleOutlineIcon />
      </IconButton>
      <>ルームID: {roomId}</>
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
        <DeleteOutlineIcon color='secondary' fontSize='large' sx={{ m: 'auto' }} />
      </TrashArea>
    </Container>
  )
}
