import React from 'react'
import ReactDOM from 'react-dom'

import Translate from '../components/Translate'

export default class Dictionary extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    //     for (const prop in data) {
    //     // `prop` contains the name of each property, i.e. `'code'` or `'items'`
    //     // consequently, `data[prop]` refers to the value of each property, i.e.
    //     // either `42` or the array
    // }

    return (
      <div className="translation">
        {this.props.text}
        <div className="divider"></div>
      </div>
    )
  }
}
