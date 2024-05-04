var textinputs = document.querySelectorAll(".wordtextinput");
//button color change
var buttons = document.querySelectorAll(".wordbuttons");
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('gray')) {
            button.classList.remove('gray');
            button.classList.add('yellow');
        } else if (button.classList.contains('yellow')) {
            button.classList.remove('yellow');
            button.classList.add('green');
        } else if (button.classList.contains('green')) {
            button.classList.remove('green');
            button.classList.add('gray');
        } else {
            button.classList.add('gray');
        }
    });
});
var currentline = 0;
var searchbuttons = document.querySelectorAll('.searchbutton');
searchbuttons.forEach(button => {
    button.addEventListener('click', () => {
        NextLine();
    });
});
//type in words
document.addEventListener('DOMContentLoaded', function () {
    const inputGroups = document.querySelectorAll('.input-group');

    inputGroups.forEach(inputGroup => {
        const inputs = inputGroup.querySelectorAll('input');

        inputs.forEach((input, index) => {
            input.addEventListener('input', function () {
                if (this.value.length === 1) {
                    if (index < inputs.length - 1) {
                        inputs[index + 1].focus();
                    }
                }
            });

            input.addEventListener('keydown', function (event) {
                if (event.key === 'Backspace' && this.value.length === 0) {
                    if (index > 0) {
                        inputs[index - 1].focus();
                    }
                }
            });
        });
    });
});

possibleanswerswordslist = possibleanswerswordslist.split(',');
onlyguesswordslist = onlyguesswordslist.split(',');
let possibleSolutions = [...possibleanswerswordslist];

var toplaySolver = window.location.pathname.includes('solver.html');

let resetButton = document.querySelector('.resetbutton');
let remainingCount = document.querySelector('.remainingcount');

startNewGame();

resetButton.addEventListener('click', () => {
    startNewGame();
});

var word;
function startNewGame() {
    //solver
    if (toplaySolver) {
        currentline = 1;
        yellowcount = 0;
        greencount = 0;
        graycount = 0;
        resetButton.textContent = "Reset";
        remainingCount.textContent = "";
        possibleSolutions = [...possibleanswerswordslist];
        for (var i = 5; i < 30; i++) {
            buttons[i].textContent = "";
        }
        for (var i = 0; i < 30; i++) {
            buttons[i].disabled = false;
        }
        for (var i = 29; i >= (currentline * 5); i--) {
            buttons[i].disabled = true;
        }
        for (var i = 0; i < 5; i++) {
            searchbuttons[i].hidden = true;
        }
        searchbuttons[currentline - 1].hidden = false;
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].value = "";
            buttons[i].classList.remove("yellow");
            buttons[i].classList.remove("green");
            buttons[i].classList.add("gray");
        }
    }
    //game
    else {
        currentline = 1;
        for (var i = 0; i < textinputs.length; i++) {
            textinputs[i].value = "";
            textinputs[i].classList.add("textgray");
        }
        resetButton.textContent = "Reset";
        for (var i = 0; i < 30; i++) {
            textinputs[i].disabled = false;
            textinputs[i].classList.remove("textgreen");
            textinputs[i].classList.remove("textyellow");
            textinputs[i].classList.add("textgray");
        }
        for (var i = 29; i >= (currentline * 5); i--) {
            textinputs[i].disabled = true;
        }
        word = possibleanswerswordslist[Math.floor(Math.random() * possibleanswerswordslist.length)];
    }
}
document.addEventListener("keyup", event => {
    if (event.key == "Enter") {
        NextLineGame();
    }
});
//a guess was made in the game
function NextLineGame() {
    if(!toplaySolver){
        GuessWord = "";
        for(var i = 0; i < 5; i++){
            GuessWord += textinputs[5* (currentline - 1) + i].value.toLowerCase();
        }
        if (possibleanswerswordslist.includes(GuessWord) || onlyguesswordslist.includes(GuessWord)) {
            currentline++;
            for (var i = 0; i < 30; i++) {
                textinputs[i].disabled = false;
            }
            for (var i = 0; i < (currentline * 5) - 5; i++) {
                textinputs[i].disabled = true;
            }
            for (var i = 29; i >= (currentline * 5); i--) {
                textinputs[i].disabled = true;
            }
            //change letter colors
            for (var i = 0; i < 5; i++) {
                for(var j = 0; j < 5; j++){
                    if(word[i] == GuessWord[j]){
                        if(i == j){
                            textinputs[5 * (currentline - 2) + j].classList.remove("textgray");
                            textinputs[5 * (currentline - 2) + j].classList.add("textgreen");
                            break;
                        }else{
                            if(textinputs[5 * (currentline - 2) + j].classList.contains("textgray")){
                                textinputs[5 * (currentline - 2) + j].classList.remove("textgray");
                            textinputs[5 * (currentline - 2) + j].classList.add("textyellow");
                            break;
                            }                    
                        }
                    }
                }
                if(word[i] == GuessWord[i]){
                    textinputs[5 * (currentline - 2) + i].classList.remove("textgray");
                    textinputs[5 * (currentline - 2) + i].classList.add("textgreen");
                }
            }
            if(word == GuessWord){
                for (var i = 0; i < 30; i++) {
                    textinputs[i].disabled = true;
                }
                resetButton.textContent = "You Won!";
            }else if(currentline == 7){
                for (var i = 0; i < 30; i++) {
                    textinputs[i].disabled = true;
                }
                resetButton.textContent = "The word was: " + word;

            }
            else{
                textinputs[5 * (currentline - 1)].focus();
            }
        }
    }
};

var GuessWord = "";
var yellowcount = 0;
var greencount = 0;
var graycount = 0;
var guessnext = "";

//solver guessing next word
function NextLine() {
    //guessed the word, end of solve:
    if(buttons[5 * (currentline - 1)].classList.contains("green") && buttons[5 * (currentline - 1) + 1].classList.contains("green") && buttons[5 * (currentline - 1) + 2].classList.contains("green") && buttons[5 * (currentline - 1) + 3].classList.contains("green") && buttons[5 * (currentline - 1) + 4].classList.contains("green")){
        resetButton.textContent = "New Solve";
        remainingCount.textContent = "";
        searchbuttons[currentline - 1].hidden = true;
    }
    //next guess:
    else{
        GuessWord = "";
        for(var i = 0; i < 5; i++){
            GuessWord += buttons[5* (currentline - 1) + i].textContent.toLowerCase();
        }
        currentline++;
        for (var i = 0; i < 30; i++) {
            buttons[i].disabled = false;
        }
        for (var i = 0; i < (currentline * 5) - 5; i++) {
            buttons[i].disabled = true;
        }
        for (var i = 29; i >= (currentline * 5); i--) {
            buttons[i].disabled = true;
        }
        for (var i = 0; i < 5; i++) {
            searchbuttons[i].hidden = true;
        }
        if(currentline < 6){
            searchbuttons[currentline - 1].hidden = false;
        }
        for(var i = 0; i < 5; i++){

            yellowcount = 0;
            greencount = 0;
            graycount = 0;
            let letter = buttons[5 * (currentline - 2) + i].textContent.toLowerCase();
            //count colors of the letter
            for(var j = 0; j < 5; j++){
                if(buttons[5 * (currentline - 2) + j].classList.contains("yellow") && buttons[5 * (currentline - 2) + j].textContent.toLowerCase() == letter){
                    yellowcount++;
                }
                if(buttons[5 * (currentline - 2) + j].classList.contains("green") && buttons[5 * (currentline - 2) + j].textContent.toLowerCase() == letter){
                    greencount++;
                }
                if(buttons[5 * (currentline - 2) + j].classList.contains("gray") && buttons[5 * (currentline - 2) + j].textContent.toLowerCase() == letter){
                    graycount++;
                }
            }
            //filter possible solutions
            if(buttons[5 * (currentline - 2) + i].classList.contains("green")){
                
                possibleSolutions = possibleSolutions.filter(word => word[i] === letter);
            }

            if(buttons[5 * (currentline - 2) + i].classList.contains("yellow")){
                possibleSolutions = possibleSolutions.filter(word => word.includes(letter) && word[i] !== letter);
                possibleSolutions = possibleSolutions.filter(word => {
                    let count = word.split('').filter(l => l === letter).length;
                    if(graycount == 0){
                        return count >= yellowcount + greencount;
                    }else{
                        return count === yellowcount + greencount;
                    }
                });
            }

            if(buttons[5 * (currentline - 2) + i].classList.contains("gray")){ 
                if(yellowcount == 0 && greencount == 0){
                    possibleSolutions = possibleSolutions.filter(word => !word.includes(letter));
                }
                else{
                    possibleSolutions = possibleSolutions.filter(word => {
                        let count = word.split('').filter(l => l === letter).length;
                        return count === yellowcount + greencount;
                    });
                    possibleSolutions = possibleSolutions.filter(word => word[i] !== letter);
                }
            }
        }
        //display remaining words
        remainingCount.textContent = possibleSolutions.length + " words left";
        guessnext = possibleSolutions[Math.floor(Math.random() * possibleSolutions.length)];
        //display next guess
        for(var i = 0; i < 5; i++){
            buttons[5 * (currentline - 1) + i].textContent = guessnext[i].toUpperCase();
        }
    }
};