import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Room } from 'components/Pages/Room'
import { Top } from 'components/Pages/Top'
import { theme } from 'common/theme/index'
import { ThemeProvider } from '@mui/material/styles'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="Room">
            <Route path=":roomId" element={<Room />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
