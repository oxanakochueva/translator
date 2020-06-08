import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import 'jquery-ui'
import 'jquery-ui-dist/jquery-ui'
import Dictionary from '../components/Dictionary'

export default class Translate extends React.Component {
  constructor(props) {
    super(props)

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

      cards: []
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

    this.handleChangeToFake = this.handleChangeToFake.bind(this)
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
    // this.handleDictionary(this.state.translatedText)
  }

  handleChangeFrom(e) {
    e.preventDefault()
    this.setState({ langFrom: e.target.value })
  }

  handleChangeTo(e) {
    e.preventDefault()
    this.setState({ langTo: e.target.value })
  }
  handleChangeToFake(e) {
    e.preventDefault()
    let li = document.getElementsByTagName('li')
    console.log(e.dataset.lang)
    // this.setState({ langTo: e.dataset.value })
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

  handleClickCard(e) {
    e.preventDefault()
    this.setState({
      textToTranslate: e.target.value
    })
    // document.getElementsByClassName('input').innerHTML = e.target.value
  }

  //////////

  render() {
    let {
      textToTranslate,
      langFrom,
      langTo,
      cards,
      translatedText,
      dictionary
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
      translateText,
      languages,
      handleChangeToFake
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
        data-lang={language.languageUi}
        onClick={this.handleChangeToFake}
      >
        {language.languageName}
      </li>
    ))

    let card = cards.map((card, i) => (
      <div className="card ui-widget-content" key={i} value={card}>
        <div>{card}</div>
        <div className="close">×</div>
      </div>
    ))

    let tr = translations.map((tr, i) => (
      <div key={i} value={tr}>
        <div className="word">
          <div>{texts[i]}</div>
          <div className="wordTranscription">[{tss[i]}]</div>
          <div className="wordIrregular">{fls[i]}</div>
          <div>{partOfSpeech[i]}</div>
        </div>
        <div className="translatedText">
          <div className="translatedTextSynonims">
            <div>{i + 1})</div>
            {tr},{synonims[i].join(',')}
          </div>
          <div className="translatedTextMeaning">({meaning[i].join(',')})</div>
        </div>
      </div>
    ))

    let syn = synonims.map((syn, i) => (
      <div key={i} value={syn}>
        <div>{syn}</div>
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
        <form onClick={this.handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Write here to translate"
            value={this.state.textToTranslate}
            onChange={this.handleChangeText}
          ></input>
          <input className="button" type="submit" value="Translate" />
          <input
            className="button"
            type="submit"
            value="📌"
            onClick={this.dropOut}
          />
        </form>
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
          <div className="custom" data-value={this.state.langTo}>
            <div>{this.state.langTo}</div>
            <ul>{uiFake}</ul>
          </div>
        </div>
        <div id="result">
          <Dictionary text={translatedText} />
          <div>{tr}</div>
        </div>
        <div className="cardContainer" onClick={this.handleClickCard}>
          {card}
        </div>
      </div>
    )
  }
}
