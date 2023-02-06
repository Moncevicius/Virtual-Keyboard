const numbers = new Map([
  ['Backquote', '`'], ['Digit1', '1'], ['Digit2', '2'], ['Digit3', '3'], ['Digit4', '4'],
  ['Digit5', '5'], ['Digit6', '6'], ['Digit7', '7'], ['Digit8', '8'], ['Digit9', '9'],
  ['Digit0', '0'], ['Minus', '-'], ['Equal', '='], ['Backspace', 'Backspace'],
]);
const keyboard = new Map([
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
const fullKeyboard = new Map([...numbers, ...keyboard]);

let main = `<div class="main-container">
  <h1>Virtual Keyboard</h1>
  <div class="text-area-container">
  <textarea name="input" id="input" readonly></textarea>
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

document.querySelector('body')
  .insertAdjacentHTML('afterbegin', main);

const text = window.document.getElementById('input');
let shift = false;
let caps = false;
let control = false;
let alt = false;
let language = '';

// set cookie
console.log(document.cookie);
switch (document.cookie) {
  case 'English':
    language = 'English';
    break;
  case 'Lithuanian':
    language = 'Lithuanian';
    break;
  default:
    language = 'English';
    break;
}

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
  if (shift) {
    if (language === 'English') {
      specialEN.forEach((value, name) => {
        document.getElementById(name).innerText = value;
      });
    }
    if (language === 'Lithuanian') {
      numbers.forEach((value, name) => {
        document.getElementById(name).innerText = value;
      });
    }
    if (key.innerText.length < 2 && specialEN.get(key.id) === undefined) {
      if (caps) {
        text.value += key.innerText;
      } else {
        text.value += key.innerText.toUpperCase();
      }
    }
    if (specialEN.get(key.id) !== undefined) {
      text.value += specialEN.get(key.id);
    }
  }
  if (!shift) {
    if (key.innerText === 'Backspace') {
      backspace();
    } else if (key.innerText === 'Tab') {
      text.value += '  ';
    } else if (key.innerText === 'Enter') {
      text.value += '\n';
    } else if (key.innerText === 'CapsLock' || key.innerText === 'Shift' || key.innerText === 'Alt' || key.innerText === 'OS' || key.innerText === 'Control') {
      // do nothing
    } else if (key.innerText === 'Space') {
      text.value += ' ';
    } else if (caps) {
      text.value += key.innerText.toUpperCase();
    } else {
      text.value += key.innerText;
    }
  }
}

// event listiners
document.addEventListener('keydown', (ev) => {
  const key = document.getElementById(ev.code);
  if (key !== null && key.innerText !== 'CapsLock') {
    if (key.innerText === 'Shift') {
      shift = true;
    }
    write(key);
    key.classList.add('buttonPressed');
  }
  if (key.innerText === 'CapsLock') {
    if (caps) {
      caps = false;
    } else {
      caps = true;
      key.classList.add('buttonPressed');
    }
  }
  if (key.innerText === 'Control') {
    control = true;
  }
  if (key.innerText === 'Alt') {
    alt = true;
  }
  if (control && alt) {
    if (language === 'English') {
      specialLT.forEach((value, name) => {
        document.getElementById(name).innerText = value;
      });
      language = 'Lithuanian';
      document.cookie = 'Lithuanian';
    } else {
      numbers.forEach((value, name) => {
        document.getElementById(name).innerText = value;
      });
      language = 'English';
      document.cookie = 'English';
    }
  }
});

document.addEventListener('keyup', (ev) => {
  if (document.getElementById(ev.code) !== null) {
    const key = document.getElementById(ev.code);
    if (key.innerText === 'Shift') {
      if (language === 'English') {
        numbers.forEach((value, name) => {
          document.getElementById(name).innerText = value;
        });
      }
      if (language === 'Lithuanian') {
        specialLT.forEach((value, name) => {
          document.getElementById(name).innerText = value;
        });
      }
    }
    if (key.innerText === 'Shift') {
      shift = false;
    }
    if (!caps) {
      key.classList.remove('buttonPressed');
    }
    if (key.innerText !== 'CapsLock') {
      key.classList.remove('buttonPressed');
    }
    if (key.innerText !== 'Control') {
      control = false;
    }
    if (key.innerText !== 'Alt') {
      alt = false;
    }
  }
});

document.addEventListener('click', (ev) => {
  if (ev.target.id !== '') {
    const key = document.getElementById(ev.target.id);
    write(key);
  }
});
