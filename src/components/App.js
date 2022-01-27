import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from 'components/Pages/Home'
import { Room } from 'components/Pages/Room'
import { Top } from 'components/Pages/Top'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/room" element={<Room />} />
        <Route exact path="/top" element={<Top />} />
      </Routes>
    </BrowserRouter>
  )
}
