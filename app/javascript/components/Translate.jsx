import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import 'jquery-ui'
import 'jquery-ui-dist/jquery-ui'
import ContentEditable from 'react-contenteditable'

import Dictionary from '../components/Dictionary'

export default class Translate extends React.Component {
  constructor(props) {
    super(props)
    this.contentEditable = React.createRef()

    this.opened = React.createRef()
    this.openedFrom = React.createRef()
    this.openedTo = React.createRef()

    this.state = {
      textToTranslate: '',
      langFrom: 'en',
      langTo: 'ru',
      translatedText: '',
      dictionary: {
        translations: [],
        synonims: [],
        meaning: [],
        partOfSpeech: [],
        fls: [],
        texts: [],
        tss: []
      },
      contentEditable: '',

      cards: [],
      term: ''
    }

    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleChangeFrom = this.handleChangeFrom.bind(this)
    this.handleChangeTo = this.handleChangeTo.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.translateText = this.translateText.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
    this.handleClickCard = this.handleClickCard.bind(this)
    this.handleDictionary = this.handleDictionary.bind(this)
    this.showError = this.showError.bind(this)
    this.dropOut = this.dropOut.bind(this)

    this.handleChangeFake = this.handleChangeFake.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.fillTextToTranslate = this.fillTextToTranslate.bind(this)
    this.pasteAsPlainText = this.pasteAsPlainText.bind(this)
    this.disableNewlines = this.disableNewlines.bind(this)
    this.deleteCard = this.deleteCard.bind(this)
    this.toggleSelect = this.toggleSelect.bind(this)
  }

  //////////////fetch

  translateText(text) {
    const data = {
      lang: this.state.langFrom + '-' + this.state.langTo,
      text: this.state.textToTranslate
    }

    this.handleDictionary(this.state.translatedText)

    if (text.length > 0) {
      fetch(`http://localhost:3000/translate/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          // console.log('Success:', data)

          if (data) {
            this.handleResponse(data)
          } else {
            // this.showError(data)
          }
        })
    }
  }

  handleResponse(data) {
    // document.getElementById('result').innerHTML = data.text[0]
    this.setState({
      translatedText: data.text[0]
    })
    this.props = {
      text: this.state.translatedText
    }
  }

  showError(data) {
    this.setState({
      error: data.error
    })
  }
  /////////////Dictionary

  handleDictionary(dictionary) {
    const data = {
      lang: this.state.langFrom + '-' + this.state.langTo,
      text: this.state.textToTranslate
    }
    fetch(`http://localhost:3000/translate/dictionary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)

        if (data) {
          console.log(data.test)
          this.setState({
            dictionary: {
              translations: data.translations,
              synonims: data.synonims,
              meaning: data.meaning,
              partOfSpeech: data.partOfSpeech,
              texts: data.texts,
              tss: data.tss,
              fls: data.fls
            }
          })
        }
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
    // this.setState({ langFrom: e.target.dataset.value })
    e.preventDefault()
    this.setState({ langFrom: e.target.value })
  }

  handleChangeTo(e) {
    // this.setState({ langTo: e.target.dataset.value })
    e.preventDefault()
    this.setState({ langTo: e.target.value })
  }

  toggleSelect(e) {
    console.log(e.target)
    if (this.openedFrom.current) {
      this.openedFrom.current.classList.toggle('opened')
    } else if (this.openedTo.current) {
      this.openedTo.current.classList.toggle('opened')
    }
    // this.opened.current.classList.toggle('opened')
  }

  handleChangeFake(e) {
    e.preventDefault()
    console.log(e.target.dataset.value)
    console.log(e.target.ref)

    if (this.openedFrom.current) {
      console.log('from', e.target.dataset.value)
      // this.handleChangeFrom(e)
      this.setState({ langFrom: e.target.dataset.value })
    } else if (this.openedTo.current) {
      console.log('to', e.target.dataset.value)
      this.setState({ langTo: e.target.dataset.value })
      // this.handleChangeTo(e)
    }
  }

  /////////// dnd

  dropOut(e) {
    e.preventDefault()
    let cards = this.state.cards.slice(0)
    cards.push(this.state.textToTranslate)

    this.setState({
      cards: cards
    })
  }

  ////////// content contentEditable
  fillTextToTranslate() {
    this.setState({
      textToTranslate: this.state.contentEditable
    })
    setTimeout(this.translateText(this.state.textToTranslate), 1500)
  }

  handleChange = e => {
    this.setState({ contentEditable: e.target.value })
    setTimeout(this.fillTextToTranslate, 1000)
  }

  handleClickCard(e) {
    this.setState({
      contentEditable: e.target.innerHTML
    })
    setTimeout(this.fillTextToTranslate, 500)
    e.preventDefault()
  }

  deleteCard(e) {
    e.preventDefault()
    e.target.parentElement.remove()
  }

  pasteAsPlainText = e => {
    e.preventDefault()

    const text = e.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }

  disableNewlines = e => {
    const keyCode = e.keyCode || e.which

    if (keyCode === 13) {
      e.returnValue = false
      if (e.preventDefault) {
        e.preventDefault()
        setTimeout(this.fillTextToTranslate, 200)
      }
    }
  }

  //////////

  render() {
    let {
      textToTranslate,
      langFrom,
      langTo,
      cards,
      translatedText,
      dictionary,
      contentEditable,
      term
    } = this.state
    let {
      translations,
      synonims,
      meaning,
      partOfSpeech,
      texts,
      tss,
      fls
    } = this.state.dictionary
    let {
      handleSubmit,
      handleChangeText,
      handleChangeFrom,
      handleChangeTo,
      handleClickCard,
      deleteCard,
      translateText,
      languages,
      handleChangeFake,
      toggleSelect,
      handleChange,
      fillTextToTranslate,
      pasteAsPlainText,
      disableNewlines
    } = this.props
    let { languageName, languageUi } = this.props.languages

    const ui = languages.map((language, i) => (
      <option key={i} value={language.languageUi}>
        {language.languageName}
      </option>
    ))

    const uiFake = languages.map((language, i) => (
      <li
        key={i}
        data-value={language.languageUi}
        onClick={this.handleChangeFake}
      >
        {language.languageName}
      </li>
    ))

    let card = cards.map((card, i) => (
      <div key={i} className="card ui-widget-content">
        <div key={i} value={card} onClick={this.handleClickCard}>
          {card}
        </div>
        <div className="close" onClick={this.deleteCard}>
          ×
        </div>
      </div>
    ))

    let mean = meaning.map((mean, i) => {
      if (mean != null) {
        return (
          <div key={i} value={mean}>
            ({mean.join(', ')})
          </div>
        )
      }
    })

    let syn = synonims.map((syn, i) => {
      if (syn != null) {
        return (
          <div key={i} value={syn}>
            , {syn.join(', ')}
          </div>
        )
      }
    })

    let tr = translations.map((tr, i) => (
      <div key={i} value={tr}>
        <div className="word">
          <div>{texts[i]}</div>
          <div className="wordTranscription">{tss[i]}</div>
          <div className="wordIrregular">{fls[i]}</div>
          <div>{partOfSpeech[i]}</div>
        </div>
        <div className="translatedText">
          <div className="translatedTextSynonims">
            <div className="translatedTextNumber">{i + 1})</div>
            {tr}
            {syn[i]}
          </div>
          <div className="translatedTextMeaning">{mean[i]}</div>
        </div>
      </div>
    ))

    $(function() {
      let i = 0
      $('.card').draggable({
        start: function(e, ui) {
          $(this).css('z-index', i++)
        }
      })
    })

    return (
      <div>
        <section id="contentEditable">
          <input
            className="button"
            type="submit"
            value="📌"
            onClick={this.dropOut}
          />
          <ContentEditable
            innerRef={this.contentEditable}
            html={this.state.contentEditable}
            disabled={false}
            onChange={this.handleChange}
            onPaste={this.pasteAsPlainText}
            onKeyPress={this.disableNewlines}
            className="placeholder"
          />
        </section>

        <div className="changeLanguage">
          <select value={this.state.langFrom} onChange={this.handleChangeFrom}>
            {ui}
          </select>
          <div className="arrow">→</div>
          <select value={this.state.langTo} onChange={this.handleChangeTo}>
            {ui}
          </select>
        </div>
        <div className="changeLanguage" style={{ bottom: '25vh' }}>
          <div className="custom">
            <div>
              <div className="customSelect" onClick={this.toggleSelect}>
                <div ref={this.openedFrom}>{this.state.langFrom}</div>
              </div>
              <ul
                className="customSelectLanguage"
                ref={this.opened}
                ref={this.openedFrom}
              >
                {uiFake}
              </ul>
            </div>
            <div>
              <div className="customSelect" onClick={this.toggleSelect}>
                <div ref={this.openedTo}>{this.state.langTo}</div>
              </div>
              <ul
                className="customSelectLanguage"
                ref={this.openedTo}
                ref={this.opened}
              >
                {uiFake}
              </ul>
            </div>
          </div>
        </div>
        <div id="result">
          <Dictionary text={translatedText} />
          <div>{tr}</div>
        </div>
        <div className="cardContainer">
          <div>{card}</div>
        </div>
      </div>
    )
  }
}
