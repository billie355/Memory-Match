
import React from 'react'

export default function Card({ card, onFlip, disabled }) {
  const handleClick = () => {
    if (!disabled && !card.matched && !card.flipped) {
      onFlip(card)
    }
  }

  return (
    <button
      className={`card ${card.flipped || card.matched ? 'flipped' : ''}`}
      onClick={handleClick}
      aria-label={card.flipped || card.matched ? `Card ${card.icon}` : 'Hidden card'}
    >
      <div className="card-inner">
        <div className="card-front">{card.icon}</div>
        <div className="card-back">❓</div>
      </div>
    </button>
  )
}
