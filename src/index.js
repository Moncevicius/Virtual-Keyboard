const text = window.document.getElementById('input');

// works for button down
document.addEventListener('keydown', (ev) => {
  if(ev.shiftKey === true) {

  }
  if (ev.code === 'Digit1') {
    text.value += '1';
    // works, adds on keydown css class to element to enable animation; should remove on keyup
    document.getElementById('1').classList.add('buttonPressed');
  }
  console.log(ev.code);
  console.log(document.getElementById('1'));
});
