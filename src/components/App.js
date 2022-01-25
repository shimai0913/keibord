import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from 'components/Pages/Home'
import { Top } from 'components/Pages/Top'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/top" element={<Top />} />
      </Routes>
    </BrowserRouter>
  )
}
