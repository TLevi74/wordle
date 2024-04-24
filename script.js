//button color change
var buttons = document.querySelectorAll(".wordbuttons");
console.log(buttons.length);
console.log("hello");
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