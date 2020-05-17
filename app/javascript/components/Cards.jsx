import React from 'react'
import ReactDOM from 'react-dom'

export default class Cards extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="cardContainer">
        <div className="card">
          <p>example</p>
          <div className="close">×</div>
        </div>
        <div className="card">
          <p>example</p>
          <div className="close">×</div>
        </div>
      </div>
    )
  }
}
