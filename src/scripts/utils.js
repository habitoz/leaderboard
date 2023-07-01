const errorElement = document.getElementById('error');

const fetchData = async (endpoint, data = {}, method = 'get') => {
  const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
  if (method === 'get') return fetch(baseUrl + endpoint);
  return fetch(baseUrl + endpoint, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

const handleError = (message) => {
  errorElement.innerHTML = message;
};

const saveGame = (gameId) => {
  localStorage.setItem('game', gameId);
};

/* eslint-disable consistent-return */
const createNewGame = async (name) => {
  try {
    const response = await fetchData('games/', { name }, 'POST');
    if (response.ok) {
      const data = await response.json();
      const gameId = data.result.split(' ')[3];
      saveGame('game', gameId);
      return gameId;
    }
    return null;
  } catch (err) {
    handleError('failed to create game.');
    return null;
  }
};
const saveScore = async (gameId, data) => {
  try {
    const response = await fetchData(`games/${gameId}/scores/`, data, 'POST');
    if (response.ok) {
      const decodedData = await response.json();
      return decodedData;
    }
    return [];
  } catch (err) {
    handleError('failed to save score');
  }
};
const fetchScores = async (gameId) => {
  try {
    const response = await fetchData(`games/${gameId}/scores`, {});
    if (response.ok) {
      const data = await response.json();
      return data.result;
    }
    return [];
  } catch (err) {
    handleError('failed to fetch scores');
    return [];
  }
};

const loadToDOM = (domContainer, scores = []) => {
  domContainer.innerHTML = '';
  errorElement.innerHTML = '';
  scores.forEach((item) => {
    const list = document.createElement('li');
    list.classList.add('player-info');
    list.innerHTML = `${item.user}: ${item.score}`;
    domContainer.appendChild(list);
  });
};

export {
  fetchData,
  saveScore,
  fetchScores,
  saveGame,
  loadToDOM,
  createNewGame,
};