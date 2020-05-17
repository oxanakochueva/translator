import React from 'react'
import ReactDOM from 'react-dom'

import Workspace from '../containers/Workspace'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Workspace />,
    document.body.appendChild(document.createElement('div'))
  )
})
