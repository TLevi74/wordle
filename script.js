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


document.addEventListener('DOMContentLoaded', function() {
    const inputGroups = document.querySelectorAll('.input-group');
    
    inputGroups.forEach(inputGroup => {
      const inputs = inputGroup.querySelectorAll('input');
      
      inputs.forEach((input, index) => {
        input.addEventListener('input', function() {
          if (this.value.length === 1) {
            if (index < inputs.length - 1) {
              inputs[index + 1].focus();
            }
          }
        });
        
        input.addEventListener('keydown', function(event) {
          if (event.key === 'Backspace' && this.value.length === 0) {
            if (index > 0) {
              inputs[index - 1].focus();
            }
          }
        });
      });
    });
  });