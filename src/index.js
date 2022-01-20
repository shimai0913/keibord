import React from 'react'
import ReactDOM from 'react-dom'
import { App } from 'components/App'

// eslint-disable-next-line
console.log('process.env.NODE_ENV:', process.env.NODE_ENV)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
