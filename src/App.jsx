
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Card from './components/Card'

const EMOJIS = ['🍎','🍌','🍒','🍇','🍉','🍋','🍑','🥝','🍍','🥥']
const PAIRS = 8 // 16 cards

function shuffle(array) {
  const a = [...array]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function useTimer(running) {
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [running])
  const reset = () => setSeconds(0)
  return { seconds, reset }
}

export default function App() {
  const [deck, setDeck] = useState([])
  const [first, setFirst] = useState(null)
  const [second, setSecond] = useState(null)
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [locked, setLocked] = useState(false)
  const [won, setWon] = useState(false)

  const { seconds, reset: resetTimer } = useTimer(!won && deck.length > 0)

  const best = useMemo(() => {
    const raw = localStorage.getItem('best-memory-match')
    return raw ? JSON.parse(raw) : null
  }, [])
  const bestRef = useRef(best)

  const saveBest = (data) => {
    bestRef.current = data
    localStorage.setItem('best-memory-match', JSON.stringify(data))
  }

  const makeDeck = () => {
    const icons = shuffle(EMOJIS).slice(0, PAIRS)
    const pairCards = icons.flatMap((icon, idx) => [
      { id: `${idx}-a`, icon, matched: false, flipped: false },
      { id: `${idx}-b`, icon, matched: false, flipped: false }
    ])
    const shuffled = shuffle(pairCards)
    setDeck(shuffled)
  }

  useEffect(() => {
    newGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const newGame = () => {
    setWon(false)
    setMoves(0)
    setMatches(0)
    setLocked(false)
    setFirst(null)
    setSecond(null)
    resetTimer()
    makeDeck()
  }

  const onFlip = (card) => {
    if (locked) return
    setDeck(d => d.map(c => c.id === card.id ? { ...c, flipped: true } : c))
    if (!first) {
      setFirst(card)
      return
    }
    if (!second && card.id !== first.id) {
      setSecond(card)
      setLocked(true)
      setMoves(m => m + 1)
      // Evaluate match after a short delay
      setTimeout(() => {
        if (first.icon === card.icon) {
          // Match
          setDeck(d => d.map(c =>
            c.icon === card.icon ? { ...c, matched: true } : c
          ))
          setMatches(m => m + 1)
        } else {
          // Unflip
          setDeck(d => d.map(c =>
            c.id === first.id || c.id === card.id ? { ...c, flipped: false } : c
          ))
        }
        setFirst(null)
        setSecond(null)
        setLocked(false)
      }, 650)
    }
  }

  useEffect(() => {
    if (matches === PAIRS && deck.length) {
      setWon(true)
      // Save best score if improved
      const data = { time: seconds, moves }
      const b = bestRef.current
      if (!b || data.time < b.time || (data.time === b.time && data.moves < b.moves)) {
        saveBest(data)
      }
    }
  }, [matches, deck.length, seconds, moves])

  return (
    <div className="container">
      <header>
        <h1>🧠 Memory Match</h1>
        <div className="stats">
          <span>Time: <strong>{seconds}s</strong></span>
          <span>Moves: <strong>{moves}</strong></span>
          <span>Matches: <strong>{matches}/{PAIRS}</strong></span>
        </div>
        <div className="actions">
          <button className="btn" onClick={newGame}>🔁 New Game</button>
        </div>
        <div className="best">
          {bestRef.current ? (
            <>
              <span>Best: ⏱️ {bestRef.current.time}s · 🎯 {bestRef.current.moves} moves</span>
            </>
          ) : (
            <span>Best: —</span>
          )}
        </div>
      </header>

      <main>
        <div className={`grid ${locked ? 'locked' : ''}`} aria-live="polite">
          {deck.map(card => (
            <Card key={card.id} card={card} onFlip={onFlip} disabled={locked} />
          ))}
        </div>
      </main>

      {won && (
        <div className="modal">
          <div className="modal-content">
            <h2>🎉 Panalo!</h2>
            <p>Natapos mo ang lahat ng pares.</p>
            <p><strong>Time:</strong> {seconds}s · <strong>Moves:</strong> {moves}</p>
            <div className="modal-actions">
              <button className="btn" onClick={newGame}>Play Again</button>
            </div>
          </div>
        </div>
      )}

      <footer>
        <small>Made with React + Vite · Emoji assets</small>
      </footer>
    </div>
  )
}
