const specialEn = new Map([
  ['Backquote', '`'],
  ['Digit1', '1'],
  ['Digit2', '2'],
  ['Digit3', '3'],
  ['Digit4', '4'],
  ['Digit5', '5'],
  ['Digit6', '6'],
  ['Digit7', '7'],
  ['Digit8', '8'],
  ['Digit9', '9'],
  ['Digit0', '0'],
  ['Minus', '-'],
  ['Equal', '='],
  ['Backspace', 'Backspace'],
]);
const keyboard = new Map([
  [1, 'Row'],
  ['Tab', 'Tab'],
  ['KeyQ', 'q'],
  ['KeyW', 'w'],
  ['KeyE', 'e'],
  ['KeyR', 'r'],
  ['KeyT', 't'],
  ['KeyY', 'y'],
  ['KeyU', 'u'],
  ['KeyI', 'i'],
  ['Key0', 'o'],
  ['KeyP', 'p'],
  ['BracketLeft', '['],
  ['BracketRight', ']'],
  [2, 'Row'],
  ['CapsLock', 'CapsLock'],
  ['KeyA', 'a'],
  ['KeyS', 's'],
  ['KeyD', 'd'],
  ['KeyF', 'f'],
  ['KeyG', 'g'],
  ['KeyH', 'h'],
  ['KeyJ', 'j'],
  ['KeyK', 'k'],
  ['KeyL', 'l'],
  ['Semicolon', ';'],
  ['Quote', '\''],
  ['Backslash', '#'],
  ['Enter', 'Enter'],
  [3, 'Row'],
  ['ShiftLeft', 'Shift'],
  ['IntlBackslash', '\\'],
  ['KeyZ', 'z'],
  ['KeyX', 'x'],
  ['KeyC', 'c'],
  ['KeyV', 'v'],
  ['KeyB', 'b'],
  ['KeyN', 'n'],
  ['KeyM', 'm'],
  ['Comma', ','],
  ['Period', '.'],
  ['Slash', '/'],
  ['ArrowUp', '&#8593;'],
  ['ShiftRight', 'Shift'],
  [4, 'Row'],
  ['ControlLeft', 'Control'],
  ['OSLeft', 'OS'],
  ['AltLeft', 'Alt'],
  ['Space', ' '],
  ['AltRight', 'Alt'],
  ['ArrowLeft', '&#8592;'],
  ['ArrowDown', '&#8595;'],
  ['ArrowRight', '&#8594;'],
  ['ControlRight', 'Control'],
]);

const fullKeyboard = new Map([...specialEn, ...keyboard]);

let main = `<div class="main-container">
  <h1>Virtual Keyboard</h1>
  <div class="text-area-container">
  <textarea name="input" id="input"></textarea>
  </div>
  <div class="keyboard-container">
  <div class="keyboard-row">`;

fullKeyboard.forEach((value, key) => {
  switch (key) {
    case 1:
    case 2:
    case 3:
    case 4:
      main += '</div><div class="keyboard-row">';
      break;
    case 'Backspace':
    case 'Tab':
    case 'CapsLock':
    case 'Enter':
    case 'ShiftLeft':
    case 'ShiftRight':
      main += `<button class="keyboard-key special-key" id="${key}">${value}</button>`;
      break;
    case 'Space':
      main += `<button class="keyboard-key space-key" id="${key}">${value}</button>`;
      break;
    default:
      main += `<button class="keyboard-key" id="${key}">${value}</button>`;
  }
});

main += `</div></div><p>Keyboard was created on Windows operating system</p>
        <p>To switch between English / Lithuanian layout press: ctrl + alt</p>`;

document.querySelector('body').insertAdjacentHTML('afterbegin', main);

// event listiners

const text = window.document.getElementById('input');
document.addEventListener('keydown', (ev) => {
  const key = document.getElementById(ev.code);
  text.value += key.innerText;
  key.classList.add('buttonPressed');
});

document.addEventListener('keyup', (ev) => {
  const key = document.getElementById(ev.code);
  key.classList.remove('buttonPressed');
});
