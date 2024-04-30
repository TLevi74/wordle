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
//write in words
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

words = words.split(',');

var toplaySolver = window.location.pathname.includes('solver.html');

let resetButton = document.querySelector('.resetbutton');

startNewGame();

resetButton.addEventListener('click', () => {
    startNewGame();
});

function startNewGame() {
    //solver
    if (toplaySolver) {
        currentline = 0;
        resetButton.value = "Reset";
        NextLine();
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].value = "";
            buttons[i].classList.remove("yellow");
            buttons[i].classList.remove("green");
            buttons[i].classList.add("gray");
        }
    }
    //game
    else {
        var textinputs = document.querySelectorAll(".wordtextinput");
        for (var i = 0; i < textinputs.length; i++) {
            textinputs[i].value = "";
            textinputs[i].classList.add("textgray");
        }
        resetButton.value = "Reset";
        var word = words[Math.floor(Math.random() * words.length)];
        console.log(word);
    }
}
document.addEventListener("keyup", event => {
    if (event.key == "Enter") {
        GuessWord();
    }
});

function GuessWord() {

};

function NextLine() {
    currentline++;
    if (toplaySolver) {
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
    }
    else {

    }
};