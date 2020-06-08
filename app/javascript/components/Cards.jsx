import React from 'react'
import ReactDOM from 'react-dom'
import Translate from '../components/Translate'

export default class Cards extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section id="contentEditable">
        <div className="textInput" contentEditable="true"></div>
        <div className="cardContainer"></div>
        <div className="putTextToContentEditable">Put Text</div>
      </section>
    )
  }
}
