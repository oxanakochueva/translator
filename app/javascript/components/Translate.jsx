import React from 'react'
import ReactDOM from 'react-dom'

export default class Translate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      textToTranslate: '',
      langFrom: 'en',
      langTo: 'ru',
      translatedText: ''
    }

    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleChangeFrom = this.handleChangeFrom.bind(this)
    this.handleChangeTo = this.handleChangeTo.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.translateText = this.translateText.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
    this.showError = this.showError.bind(this)
  }

  //////////////fetch

  translateText(translatedText) {
    let data = {
      lang: this.state.langFrom + '-' + this.state.langTo,
      text: this.state.textToTranslate,
      translatedText: ''
    }

    fetch(`http://localhost:3000/translate/translate.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)
        this.setState({ translatedText: data })

        if (data.data) {
          this.handleResponse(data)
        } else {
          this.showError(data)
        }
      })
  }

  handleResponse(data) {
    if (data.code == 200) {
      document.getElementById('result').innerHTML = data.text
      this.setState({
        translatedText: data.text
      })
    }
  }

  showError(data) {
    this.setState({
      error: data.error
    })
  }

  //////////////////////

  handleChangeText(e) {
    e.preventDefault()
    this.setState({
      textToTranslate: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.translateText(this.state.textToTranslate)
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
    let { textToTranslate } = this.state
    let {
      // handleSubmit,
      handleChangeText,
      handleChangeFrom,
      handleChangeTo,
      translateText,
      languages
    } = this.props
    let { langFrom, langTo } = this.state
    let { languageName, languageUi } = this.props.languages

    const ui = languages.map((language, i) => (
      <option key={i} value={language.languageUi}>
        {language.languageName}
      </option>
    ))

    return (
      <div>
        <form onClick={this.handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Write here to translate"
            value={this.state.textToTranslate}
            onChange={this.handleChangeText}
          ></input>
          <input className="button" type="submit" value="Translate" />
        </form>
        <div className="changeLanguage">
          <select value={this.state.langFrom} onChange={this.handleChangeFrom}>
            {ui}
          </select>
          <select value={this.state.langTo} onChange={this.handleChangeTo}>
            {ui}
          </select>
        </div>
        <div id="result"></div>
      </div>
    )
  }
}
