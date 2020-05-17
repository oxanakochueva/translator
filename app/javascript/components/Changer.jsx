import React from 'react'
import ReactDOM from 'react-dom'

export default class Changer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      langFrom: 'en',
      langTo: 'ru'
    }

    this.handleChangeFrom = this.handleChangeFrom.bind(this)
    this.handleChangeTo = this.handleChangeTo.bind(this)
  }

  handleChangeFrom(e) {
    e.preventDefault()
    this.setState({ langFrom: e.target.value })
  }

  handleChangeTo(e) {
    e.preventDefault()
    this.setState({ langTo: e.target.value })
  }

  render() {
    let { langFrom, langTo } = this.state
    let { handleChangeFrom, handleChangeTo, languages } = this.props
    let { languageName, languageUi } = this.props.languages

    const ui = languages.map((language, i) => (
      <option key={i} value={language.languageUi}>
        {language.languageName}
      </option>
    ))

    return (
      <div className="changeLanguage">
        <select value={this.state.langFrom} onChange={this.handleChangeFrom}>
          {ui}
        </select>
        <select value={this.state.langTo} onChange={this.handleChangeTo}>
          {ui}
        </select>
      </div>
    )
  }
}
