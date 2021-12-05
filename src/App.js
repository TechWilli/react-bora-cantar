import React from 'react'
import styles from './App.module.css'
import Button from './components/button/Button'
import InputText from './components/input-text/InputText'

function App() {

  const [loadingLyric, setLoadingLyric] = React.useState(false)
  const [lyric, setLyrik] = React.useState('')
  const [urlParams, setUrlParams] = React.useState({
    artist: '',
    title: ''
  })

  const handleSearchLyric = React.useCallback(({ target }) => {
    setUrlParams(currentState => ({
      ...currentState,
      [target.id]: target.value
    }))

  }, [])

  const handleFetchLyric = React.useCallback(async () => {

    const { artist, title } = urlParams

    setLoadingLyric(true)
    setLyrik('')

    try {
      const data = await fetch(`https://api.lyrics.ovh/v1/${artist.trim()}/${title.trim()}`)
      const dataParsed = await data.json()

      if (dataParsed.lyrics) {
        let lyricArray = dataParsed.lyrics.split(' ')

        // tratando linha com palavras em espanhol no início das letras (???)
        // achando o primeiro caso do \r\n
        const indexToStart = lyricArray.findIndex(item => item.includes('\r\n'))

        lyricArray = lyricArray.slice(indexToStart)

        // removendo o primeiro caso do \r\n
        lyricArray[0] = lyricArray[0].substr(lyricArray[0].indexOf('\r\n') + 2)

        const lyricToString = lyricArray.join(' ')

        console.log('lyric:', lyricToString)

        setLyrik(lyricToString)

      } else if (dataParsed.error) {
        setLyrik('Letra não econtrada : (')
      }

    } catch (error) {
      console.log('error:', error)
    }

    setLoadingLyric(false)

  }, [urlParams])

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleWrapper}>
            <h1>Bora Cantar? 🎵🔔</h1>
          </div>
        </header>
        <main className={styles.main}>
          <p style={{ marginBottom: '1rem' }}>Pesquise um artista e uma música dele para ver a letra:</p>
          <div className={styles.searchArea}>
            <InputText
              id="artist"
              placeholder='Pesquisar cantor'
              value={urlParams.artist}
              onChange={handleSearchLyric}
            />
            <InputText
              id="title"
              placeholder='Pesquisar música'
              value={urlParams.title}
              onChange={handleSearchLyric}
            />
            <Button
              title='Buscar música'
              onClick={handleFetchLyric}
            />
          </div>
          <div className={styles.searchResult}>
            {!!lyric && <p className={styles.lyrics}>{lyric}</p>}
            {loadingLyric && <React.Fragment>
              <div className={styles.loadingSpinner}></div>
              <span className="loading">Buscando letra...</span>
            </React.Fragment>}
          </div>
        </main>

      </div>
    </div>
  )
}

export default App
