const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('btn-save-score');
const finalScore = document.getElementById('final-score');
const mostRecentScore = localStorage.getItem('mostRecentScore');

// Parse the highScores value, if null or first time just fill it with array
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;
// Debugging to look at the high scores
// console.log(highScores);

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
  // If there's any character, enable, none, disabled
  saveScoreBtn.disabled = !username.value;
})

saveHighScore = (e) => {
  console.log('Clicked the Save button!');
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value
  };

  // Push recent score to the hishScores array
  highScores.push(score);

  // If the b score is greater than a, then put the b first
  highScores.sort((a, b) =>  b.score - a.score)

  // At index 5 cut everything after that
  highScores.splice(MAX_HIGH_SCORES);

  localStorage.setItem('highScores', JSON.stringify(highScores));
  window.location.assign('/');

  // Debugging the highscores
  // console.log(highScores);
}