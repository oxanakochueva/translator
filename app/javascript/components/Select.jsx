import React from 'react'
import ReactDOM from 'react-dom'

import SelectItem from '../components/SelectItem'

export default class Select extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.renderListItems = this.renderListItems.bind(this)
  }

  handleChange(language) {
    const { name, handleChange } = this.props
    handleChange(name, language)
  }
  handleClick() {
    const { name } = this.props
    this.props.handleClick(name)
  }

  renderListItems() {
    const { languages } = this.props
    let listItems = []
    languages.forEach((language, i) =>
      listItems.push(
        <SelectItem
          key={i}
          handleClick={this.handleChange}
          language={language}
        />
      )
    )
    return listItems
  }

  render() {
    const { opened, text } = this.props
    return (
      <div className="Select">
        <div className="name" onClick={this.handleClick}>
          {text}
        </div>

        {opened ? (
          <div className="customSelectLanguage">{this.renderListItems()}</div>
        ) : (
          ''
        )}
      </div>
    )
  }
}
