import React from 'react'
import ReactDOM from 'react-dom'

import Translate from '../components/Translate'

export default class SelectItem extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { language } = this.props
    this.props.handleClick(language)
  }

  render() {
    const { language } = this.props
    return (
      <li className="SelectItem" onClick={this.handleClick}>
        {language.languageName}
      </li>
    )
  }
}
