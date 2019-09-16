import Game, { GAME_EVENTS } from './js/Game';
import Timer, { TIMER_EVENTS } from './js/Timer';
import Modal from './blocks/patterns/modal/index';
import Text from './blocks/content/text';
import ThemeSwitch from './blocks/patterns/theme-switch';
import Complexity, { COMPLEXITY_EVENTS, SETTINGS } from './js/Complexity';
import {
  GAME_SETTINGS_LOCAL_STORAGE,
  COMPLEXITY_DEFAULT,
} from './js/constants';

Text.animationInit();
const themeSwitch = new ThemeSwitch();
themeSwitch.init();

const modalWin = new Modal('modal-win');
const modalLose = new Modal('modal-lose');
// eslint-disable-next-line no-unused-vars
const complexity = new Complexity('complexity', 'game');
let timer;
let game;

function createNewGame() {
  if (timer) {
    timer.reset();
    timer = null;
  }

  const complexitySettings = localStorage.getItem(GAME_SETTINGS_LOCAL_STORAGE);

  const sett = complexitySettings
    ? SETTINGS[complexitySettings]
    : SETTINGS[COMPLEXITY_DEFAULT];

  timer = new Timer('timer', sett.time);
  game = new Game('game', sett.numberOfCards);
}

document.addEventListener(COMPLEXITY_EVENTS.CHANGE, () => {
  createNewGame();
});

document.addEventListener(GAME_EVENTS.START, function gameStart() {
  timer.start();
});

document.addEventListener(GAME_EVENTS.END, function gameEnd() {
  timer.end();
  modalWin.open();
});

document.addEventListener(TIMER_EVENTS.END, function timerEnd() {
  if (!game.isEnd()) {
    modalLose.open();
  }
});

const newButtons = document.querySelectorAll('[data-new-game]');
[...newButtons].forEach(button => {
  button.addEventListener('click', () => {
    createNewGame();
  });
});

createNewGame();
