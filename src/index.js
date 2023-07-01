import './style.css';
import {
  createNewGame, saveScore, fetchScores, loadToDOM,
} from './scripts/utils.js';

const form = document.getElementById('form');
const playerName = document.getElementById('player-name');
const playerScore = document.getElementById('player-score');
const playersList = document.getElementById('players-list');
const refreshBtn = document.getElementById('refresh-btn');

let game = localStorage.getItem('game');
if (!game) {
  game = createNewGame('EPL-RESULT');
}

let scores = [];
const fetchAndLoad = async () => {
  scores = await fetchScores(game);
  if (scores.length) loadToDOM(playersList, scores);
};
fetchAndLoad();
refreshBtn.addEventListener('click', () => {
  fetchAndLoad();
});
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const saveData = async () => {
    await saveScore(game, { user: playerName.value, score: +playerScore.value });
    await fetchAndLoad();
  };
  saveData();
});