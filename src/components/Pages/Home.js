import { useEffect } from 'react'
import Box from '@mui/material/Box'
import {} from 'common/Firebase'

export const Home = () => {
  useEffect(() => {
    console.log('useEffect発火')
  }, [])

  return (
    <Box>
      Home
    </Box>
  )
}
