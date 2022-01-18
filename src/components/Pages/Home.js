import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Draggable from 'react-draggable'
import firebase from 'firebase/compat/app'
import { orderBy } from "firebase/firestore";
import { db } from 'common/Firebase'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Input from '@mui/material/Input'
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const Container = styled(Box)`
  witdh: ${document.documentElement.clientWidth}px;
  height: ${document.documentElement.clientHeight}px;
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
  position: relative;
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
  const draggableRef = useRef(false)
  const isDragRef = useRef(false)
  const [nameText, setNameText] = useState('')
  const [horseBatches, setHorseBatches] = useState({})

  useEffect(() => {
    let obj = {}
    db.collection("horses").orderBy(`createdAt`).onSnapshot((snapshot) => {
      snapshot.docChanges().map((collections) => {
        const docId = collections.doc.id
        const data = collections.doc.data()
        obj[docId] = data
      })
      setHorseBatches(obj)
    })
  }, [])

  const onDrag = () => {
    isDragRef.current = true
  }

  const onStop = async(_event, data, key) => {
    if (isDragRef.current) {
      const newObject = {
        name: horseBatches[key].name,
        x: data.x,
        y: data.y,
        editMode: false,
      }
      setHorseBatches({ ...horseBatches, [key]: newObject })
      await db.collection("horses").doc(key).update(newObject).then(() => {
        // pass
      }).catch((error) => {
        console.error("error: ", error)
      })
    }
    isDragRef.current = false
  }

  const createBatch = () => {
    const batchesLength = Object.keys(horseBatches).length
    if (batchesLength < 18) {
      const newHorseData = {
        name: 'うま',
        x: 0,
        y: 0,
        editMode: false,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date())
      }
      db.collection("horses").add(newHorseData).then((docRef) => {
        setHorseBatches({ ...horseBatches, [docRef.id]: newHorseData })
      }).catch((error) => {
        console.error("error: ", error)
      })
    }
  }

  const editModeOn = (key) => {
    const newObject = {
      name: horseBatches[key].name,
      x: horseBatches[key].x,
      y: horseBatches[key].y,
      editMode: true,
    }
    setHorseBatches({ ...horseBatches, [key]: newObject })
    setNameText(horseBatches[key].name)
  }

  const editModeOff = async(key) => {
    const newObject = {
      name: nameText,
      x: horseBatches[key].x,
      y: horseBatches[key].y,
      editMode: false,
    }
    setHorseBatches({ ...horseBatches, [key]: newObject })
    setNameText('')
    await db.collection("horses").doc(key).update(newObject).then(() => {
      // pass
    }).catch((error) => {
      console.error("error: ", error)
    })
  }

  const handleChange = (e) => {
    const val = e.target.value
    setNameText(val)
  }

  return (
    <Container>
      <IconButton color="primary" onClick={createBatch}>
        <AddCircleOutlineIcon />
      </IconButton>
      <Grid container>
        {Object.entries(horseBatches).map(([key, horseData]) => {
          return (
            <Draggable
              key={key}
              ref={draggableRef}
              position={{
                x: horseData.x,
                y: horseData.y,
              }}
              onDrag={onDrag}
              onStop={(event, data) => onStop(event, data, key)}
            >
              <Batch
                ref={isDragRef}
                onDoubleClick={() => editModeOn(key)}
                style={{ background: horseData.editMode ? '#4D98FF' : '#1A1667' }}
              >
                {horseBatches[key].editMode ? (
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
                ) }
              </Batch>
            </Draggable>
          )
        })}
      </Grid>
    </Container>
  )
}
