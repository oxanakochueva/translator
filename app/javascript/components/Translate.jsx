import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import 'jquery-ui'
import 'jquery-ui-dist/jquery-ui'
import ContentEditable from 'react-contenteditable'

import Dictionary from '../components/Dictionary'
import Select from '../components/Select'

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
      langFromName: 'English',
      langTo: 'ru',
      langToName: 'Russian',
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
      term: '',
      ok: true,
      fromSelectOpen: false,
      toSelectOpen: false
    }

    this.translateText = this.translateText.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
    this.handleClickCard = this.handleClickCard.bind(this)
    this.handleDictionary = this.handleDictionary.bind(this)
    this.dropOut = this.dropOut.bind(this)

    this.handleChange = this.handleChange.bind(this)
    this.fillTextToTranslate = this.fillTextToTranslate.bind(this)
    this.pasteAsPlainText = this.pasteAsPlainText.bind(this)
    this.disableNewlines = this.disableNewlines.bind(this)
    this.deleteCard = this.deleteCard.bind(this)
    this.toggleSelect = this.toggleSelect.bind(this)
    this.handleLanguageChange = this.handleLanguageChange.bind(this)

    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.setRef = this.setRef.bind(this)
  }

  //////////////fetch

  translateText(text) {
    const data = {
      lang: this.state.langFrom + '-' + this.state.langTo,
      text: this.state.textToTranslate
    }

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
          if (data) {
            this.handleResponse(data)
            console.log(data)
            this.handleDictionary(this.state.textToTranslate)
          }
        })
    }
  }

  handleResponse(data) {
    this.setState({
      translatedText: data.text[0]
    })
    this.props = {
      text: this.state.translatedText
    }
  }
  /////////////Dictionary

  handleDictionary(dictionary) {
    const data = {
      lang: this.state.langFrom + '-' + this.state.langTo,
      text: this.state.textToTranslate
    }
    console.log(dictionary)
    fetch(`http://localhost:3000/translate/dictionary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        console.log(response.statusText)
        console.log(response.status)

        if (response.status == 200) {
          return response.json()
        }
      })

      .then(data => {
        console.log('Success:', data)
        if (typeof data !== 'undefined') {
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
        } else {
          this.setState({
            ok: false
          })
        }
      })
      .catch(err => console.error(err))
  }

  //////////////////////

  handleLanguageChange(name, language) {
    console.log(name, language)
    if (name == 'openedFrom') {
      this.setState({
        fromSelectOpen: false,
        toSelectOpen: false,
        langFrom: language.languageUi,
        langFromName: language.languageName
      })
    }
    if (name == 'openedTo') {
      this.setState({
        fromSelectOpen: false,
        toSelectOpen: false,
        langTo: language.languageUi,
        langToName: language.languageName
      })
    }
  }

  toggleSelect(name) {
    if (name == 'openedFrom') {
      this.setState({
        fromSelectOpen: true
      })
    }
    if (name == 'openedTo') {
      this.setState({
        toSelectOpen: true
      })
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setRef(node) {
    this.opened = node
  }

  handleClickOutside(e) {
    if (this.opened && !this.opened.contains(e.target)) {
      this.setState({
        fromSelectOpen: false,
        toSelectOpen: false
      })
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
    e.preventDefault()
    this.setState({
      contentEditable: e.target.innerHTML
    })
    setTimeout(this.fillTextToTranslate, 500)
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
      e.preventDefault()
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
      term,
      ok
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
      handleChangeFrom,
      handleChangeTo,
      handleClickCard,
      deleteCard,
      translateText,
      languages,
      toggleSelect,
      handleChange,
      handleBlur,
      fillTextToTranslate,
      pasteAsPlainText,
      disableNewlines
    } = this.props
    let { languageName, languageUi } = this.props.languages

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
      <div className="wordBlock" key={i} value={tr}>
        <div className="word">
          <div>{texts[i]}</div>
          <div className="wordTranscription">{tss[i]}</div>
          <div className="wordIrregular">{fls[i]}</div>
          <div className="wordPos">{partOfSpeech[i]}</div>
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
      let l = 105
      $('.card').draggable({
        start: function(e, ui) {
          $(this).css('z-index', l++)
        }
      })

      $('.button').click(function() {
        setTimeout(card, 100)
      })

      function card() {
        let docHeight = $('.cardContainer').height(),
          docWidth = $('.cardContainer').width(),
          $card = $('.card'),
          cardWidth = $card.width(),
          cardHeight = $card.height(),
          heightMax = docHeight - cardHeight,
          widthMax = docWidth - cardWidth,
          $cardLast = $card.last()

        $cardLast.each(function() {
          $cardLast.css({
            left: Math.floor(Math.random() * widthMax),
            top: Math.floor(Math.random() * heightMax)
          })
        })
      }
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
          <div className="custom">
            <div className="customSelect" ref={this.setRef}>
              <Select
                languages={this.props.languages}
                text={this.state.langFromName}
                handleClick={this.toggleSelect}
                handleChange={this.handleLanguageChange}
                name="openedFrom"
                opened={this.state.fromSelectOpen}
              />
              <div className="arrow">→</div>
              <Select
                languages={this.props.languages}
                text={this.state.langToName}
                handleClick={this.toggleSelect}
                handleChange={this.handleLanguageChange}
                name="openedTo"
                opened={this.state.toSelectOpen}
              />
            </div>
          </div>
        </div>
        <div id="result">
          <div>
            {dictionary.translations.length == 0 ? (
              <div className="translation">{translatedText}</div>
            ) : (
              <div className="dictionary">{tr}</div>
            )}
          </div>
        </div>
        <div className="cardContainer">{card}</div>
      </div>
    )
  }
}
