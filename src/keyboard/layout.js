const keyboard = new Map([
  ['Backquote', '`'], ['Digit1', '1'], ['Digit2', '2'], ['Digit3', '3'], ['Digit4', '4'],
  ['Digit5', '5'], ['Digit6', '6'], ['Digit7', '7'], ['Digit8', '8'], ['Digit9', '9'],
  ['Digit0', '0'], ['Minus', '-'], ['Equal', '='], ['Backspace', 'Backspace'],
  [1, 'Row'], ['Tab', 'Tab'], ['KeyQ', 'q'], ['KeyW', 'w'], ['KeyE', 'e'],
  ['KeyR', 'r'], ['KeyT', 't'], ['KeyY', 'y'], ['KeyU', 'u'], ['KeyI', 'i'],
  ['Key0', 'o'], ['KeyP', 'p'], ['BracketLeft', '['], ['BracketRight', ']'],
  [2, 'Row'], ['CapsLock', 'CapsLock'], ['KeyA', 'a'], ['KeyS', 's'], ['KeyD', 'd'],
  ['KeyF', 'f'], ['KeyG', 'g'], ['KeyH', 'h'], ['KeyJ', 'j'], ['KeyK', 'k'],
  ['KeyL', 'l'], ['Semicolon', ';'], ['Quote', '\''], ['Backslash', '#'], ['Enter', 'Enter'],
  [3, 'Row'], ['ShiftLeft', 'Shift'], ['IntlBackslash', '\\'], ['KeyZ', 'z'], ['KeyX', 'x'],
  ['KeyC', 'c'], ['KeyV', 'v'], ['KeyB', 'b'], ['KeyN', 'n'], ['KeyM', 'm'], ['Comma', ','],
  ['Period', '.'], ['Slash', '/'], ['ArrowUp', '&#8593;'], ['ShiftRight', 'Shift'],
  [4, 'Row'], ['ControlLeft', 'Control'], ['OSLeft', 'OS'], ['AltLeft', 'Alt'], ['Space', 'Space'],
  ['AltRight', 'Alt'], ['ArrowLeft', '&#8592;'], ['ArrowDown', '&#8595;'],
  ['ArrowRight', '&#8594;'], ['ControlRight', 'Control'],
]);

const specialEN = new Map([
  ['Backquote', '¬'], ['Digit1', '!'], ['Digit2', '"'], ['Digit3', '£'], ['Digit4', '$'],
  ['Digit5', '%'], ['Digit6', '^'], ['Digit7', '&'], ['Digit8', '*'], ['Digit9', '('],
  ['Digit0', ')'], ['Minus', '_'], ['Equal', '+'], ['BracketLeft', '['], ['BracketRight', ']'],
  ['Semicolon', ':'], ['Quote', '@'], ['Backslash', '~'], ['Comma', '<'], ['Period', '>'],
  ['Slash', '?'],
]);

const specialLT = new Map([
  ['Backquote', '¬'], ['Digit1', 'ą'], ['Digit2', 'č'], ['Digit3', 'ę'], ['Digit4', 'ė'],
  ['Digit5', 'į'], ['Digit6', 'š'], ['Digit7', 'ų'], ['Digit8', 'ū'], ['Digit9', '('],
  ['Digit0', ')'], ['Minus', '_'], ['Equal', '+'], ['BracketLeft', '['], ['BracketRight', ']'],
  ['Semicolon', ':'], ['Quote', '@'], ['Backslash', '~'], ['Comma', '<'], ['Period', '>'],
  ['Slash', '?'],
]);

let main = `<div class="main-container">
  <h1>Virtual Keyboard</h1>
  <div class="text-area-container">
  <textarea name="input" id="input"></textarea>
  </div>
  <div class="keyboard-container">
  <div class="keyboard-row">`;

keyboard.forEach((value, key) => {
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

document.querySelector('body')
  .insertAdjacentHTML('afterbegin', main);

const text = window.document.getElementById('input');
let shift = false;

// functions

// delete
function backspace() {
  const pos = text.selectionStart;
  const posEnd = text.selectionEnd;
  if (pos === posEnd) {
    text.value = text.value.slice(0, pos - 1) + text.value.slice(pos);
    text.selectionStart = pos - 1;
    text.selectionEnd = pos - 1;
  } else {
    text.value = text.value.slice(0, pos) + text.value.slice(posEnd);
    text.selectionStart = pos;
    text.selectionEnd = pos;
  }
}

function write(key) {
  switch (key.innerText) {
    case 'Backspace':
      backspace();
      break;
    case 'Tab':
      text.value += '  ';
      break;
    case 'Enter':
      text.value += '\n';
      break;
    case 'CapsLock':
    case 'Shift':
    case 'Alt':
    case 'OS':
    case 'Control':
      break;
    case 'Space':
      text.value += ' ';
      break;
    default:
      text.value += key.innerText;
      break;
  }
}

// event listiners
document.addEventListener('keydown', (ev) => {
  const key = document.getElementById(ev.code);
  if (key !== null) {
    if (key.innerText === 'Shift') {
      shift = true;
    }
    write(key);
    key.classList.add('buttonPressed');
  }
});

document.addEventListener('keyup', (ev) => {
  if (document.getElementById(ev.code) !== null) {
    const key = document.getElementById(ev.code);
    if (key.innerText === 'Shift') {
      shift = false;
    }
    key.classList.remove('buttonPressed');
  }
});

document.addEventListener('click', (ev) => {
  if (ev.target.id !== '') {
    const key = document.getElementById(ev.target.id);
    write(key);
  }
});
