# Tic Tac Toe Frontend (Ocean Professional)

A modern, lightweight React Tic Tac Toe UI. Supports Player vs Player and an optional AI opponent with a clean Ocean Professional theme.

## Features

- Player vs Player gameplay (alternate X/O)
- AI mode (heuristic: win/block, center, corners, sides)
- Winner and draw detection with visual highlight
- In-memory score tracking (X, O, Draws)
- Accessible buttons and focus outlines
- Modern UI with subtle gradients, shadows, and rounded corners

## Project Structure

- src/App.js – App shell and layout
- src/components/Game.js – Game state, rules, and flow
- src/components/Board.js – 3x3 board grid
- src/components/Square.js – Individual board cells
- src/components/Controls.js – Reset and Toggle AI
- src/components/Scoreboard.js – Score display
- src/utils/ai.js – Heuristic AI
- src/utils/linesData.js – Win line data
- src/index.css – Global styles and theme

## Run

- npm install
- npm start
- Open http://localhost:3000

## Notes

- Scores are stored in component state and reset on page reload.
- No backend or environment variables are required.
