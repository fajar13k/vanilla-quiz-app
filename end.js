const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('btn-save-score');
const finalScore = document.getElementById('final-score');

const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
  // If there's any character, enable, none, disabled
  saveScoreBtn.disabled = !username.value;
})

saveHighScore = (e) => {
  e.preventDefault();
}