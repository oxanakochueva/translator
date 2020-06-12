import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import Translate from '../components/Translate'
import Dictionary from '../components/Dictionary'

import Cards from '../components/Cards'
//import Changer from '../components/Changer'

const languages = [
  {
    languageName: 'English',
    languageUi: 'en'
  },
  {
    languageName: 'Russian',
    languageUi: 'ru'
  },
  {
    languageName: 'Ukranian',
    languageUi: 'uk'
  },
  {
    languageName: 'French',
    languageUi: 'fr'
  },
  {
    languageName: 'German',
    languageUi: 'de'
  },
  {
    languageName: 'Spanish',
    languageUi: 'es'
  },
  {
    languageName: 'Greek',
    languageUi: 'el'
  },
  {
    languageName: 'Swedish',
    languageUi: 'sv'
  },
  {
    languageName: 'Italian',
    languageUi: 'it'
  },
  {
    languageName: 'Czech',
    languageUi: 'cs'
  }
]

export default class Workspace extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Translate languages={languages} />
        <Cards />
      </div>
    )
  }
}
