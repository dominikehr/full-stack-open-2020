import react from 'react'

const Languages = ( {languages} ) => {
    return (
      <ul>
        {languages.map(language =>
          <li key={language.iso639_1}>
            {language.name}
          </li>)}
      </ul>
    )
  }

export default Languages