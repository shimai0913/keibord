import React from 'react'
import { Home } from 'components/Pages/Home'
import { Top } from 'components/Pages/Top'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/top" component={Top} />
      </Switch>
    </BrowserRouter>
  )
}
