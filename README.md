
# React Memory Match (Emoji Edition)

Isang simple, mabilis, at masayang **Memory Matching** game na gawa sa **React + Vite**.

## Features
- 🎴 16 cards (8 pairs) na random ang pagkakasaman sa bawat laro
- ⏱️ Timer, move counter, at match counter
- 🏆 Best score (pinakamabilis na oras at pinakamababang moves) gamit ang `localStorage`
- 📱 Responsive layout (mobile, tablet, desktop)
- 🔁 Reset / New Game button
- 🎉 Win modal kapag tapos na ang lahat ng pares

## Quick Start

```bash
# 1) Install dependencies
npm install

# 2) Run locally
npm run dev

# 3) Build for production
npm run build
npm run preview
```

## Deploy to GitHub Pages
1. I-push ang project na ito sa iyong GitHub repository.
2. Sa `vite.config.js`, **palitan ang** `base` sa `'/<repo-name>/'` (hal. `'/react-memory-match/'`).
3. Run:
   ```bash
   npm run build
   npm run deploy
   ```
4. Sa GitHub, pumunta sa **Settings → Pages** at piliin ang branch na `gh-pages`.

> Tip: Kung ayaw mo mag-set ng base, pwede mo ring i-deploy sa Netlify o Vercel.

## Tech Stack
- React 18
- Vite 5

## License
MIT
