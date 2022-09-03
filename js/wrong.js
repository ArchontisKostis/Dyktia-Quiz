var wrongQuestionsArray = window.localStorage.getItem('WrongQuestions');
wrongQuestionsArray = JSON.parse(wrongQuestionsArray);
console.log(wrongQuestionsArray);

const main = document.querySelector('main');
const body = document.querySelector('body');

if(wrongQuestionsArray){
    wrongQuestionsArray
    .forEach(element => {
        var questionDiv = document.createElement('div');
        questionDiv.className = "question";

        var answersList = document.createElement('ol');

        var answer1 = document.createElement('li');
        answer1.innerHTML = element.choice1;

        var answer2 = document.createElement('li');
        answer2.innerHTML = element.choice2;

        var answer3 = document.createElement('li');
        answer3.innerHTML = element.choice3;

        var answer4 = document.createElement('li');
        answer4.innerHTML = element.choice4;

        // Add answers to UL
        answersList.appendChild(answer1);
        answersList.appendChild(answer2);
        answersList.appendChild(answer3);
        answersList.appendChild(answer4);
        
        // Create correct answer Element
        var correctIs = document.createElement('span');
        correctIs.innerHTML = 'Η Σωστή απάντηση είναι: ' + element.answer;
        
        var h1 = document.createElement('h1');
        h1.innerHTML = element.question;

        questionDiv.appendChild(h1);
        questionDiv.appendChild(answersList);
        questionDiv.appendChild(correctIs);
        main.appendChild(questionDiv);
    });

    // Add Delete Questions Button
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn';
    deleteBtn.id = 'delete-questions-btn';
    deleteBtn.innerHTML = 'ΔΙΑΓΡΑΦΗ ΛΑΘΟΣ ΕΡΩΤΗΣΕΩΝ'
    body.appendChild(deleteBtn);
}
else {
    var noQuestionsHeader = document.createElement('h1');
    noQuestionsHeader.id = 'noQuestions';
    noQuestionsHeader.innerHTML = 'ΔΕΝ ΥΠΑΡΧΟΥΝ ΑΠΟΘΗΚΕΥΜΕΝΕΣ ΛΑΘΟΣ ΕΡΩΤΗΣΕΙΣ';
    main.appendChild(noQuestionsHeader);
}

var button = document.querySelector('button');

button.addEventListener('click', function (evt) {
    window.localStorage.removeItem('WrongQuestions');
    window.alert('Οι ερωτήσεις που έκανες λάθος διαγράφηκαν από την μνήμη!');
    location.reload();
}, false);