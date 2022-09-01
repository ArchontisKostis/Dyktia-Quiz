const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore')
const finalQuote = document.getElementById('final-quote');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 10;

if(mostRecentScore <= 5) {
    finalQuote.innerText = "Μπρο, δεν περνάς με τίποτα... 😢";
} 
else if (mostRecentScore > 5 && mostRecentScore < 18) {
    finalQuote.innerText = "Θέλεις δουλειά ακόμη... 😕";
}
else if (mostRecentScore >= 18 && mostRecentScore < 25) {
    finalQuote.innerText = "Τσίμα-τσίμα το περνάς! 😉";
}
else {
    finalQuote.innerText = "Αν τα πάς έτσι και στην εξέταση θα σκίσεις! 🤯";
}
finalScore.innerText = "" + mostRecentScore + "/37" ;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };

    highScores.push(score);
    highScores.sort( (a,b) => b.score - a.score);
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign("/");

};