import React from 'react';
import './index.css';
import Game from './components/Game';

/**
 * App shell applying the Ocean Professional theme and layout.
 */
// PUBLIC_INTERFACE
export default function App() {
  return (
    <div className="app-shell" role="application" aria-label="Tic Tac Toe Game">
      <div className="container">
        <header className="header">
          <h1 className="header-title" aria-label="Tic Tac Toe">
            <span style={{ color: 'var(--color-primary)' }}>Tic</span>
            <span style={{ color: 'var(--color-secondary)' }}>Tac</span>
            <span style={{ color: 'var(--color-text)' }}>Toe</span>
          </h1>
          <p className="header-subtitle">Play against a friend or toggle AI to challenge the computer.</p>
        </header>
        <Game />
      </div>
    </div>
  );
}
