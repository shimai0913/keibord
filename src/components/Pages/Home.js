import { useEffect } from 'react'
import Box from '@mui/material/Box'
import { db } from 'common/Firebase'
import { collection, getDocs } from 'firebase/firestore';

export const Home = () => {
  useEffect(() => {
    console.log('useEffect発火')
    const roomCollection = collection(db, 'room')
    getDocs(roomCollection).then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => console.log(doc.data()))
    })
  }, [])

  return (
    <Box>
      Home
    </Box>
  )
}
