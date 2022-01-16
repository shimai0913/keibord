import { useEffect } from 'react'
import Box from '@mui/material/Box'

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
