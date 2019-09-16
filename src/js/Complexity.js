import { CLASSES } from './Game';
import {
  GAME_SETTINGS_LOCAL_STORAGE,
  COMPLEXITY_DEFAULT,
  COMPLEXITY_LOW,
  COMPLEXITY_MEDIUM,
  COMPLEXITY_HARD,
} from './constants';

export const COMPLEXITY_EVENTS = {
  CHANGE: 'COMPLEXITY.CHANGE',
};

export const SETTINGS = {
  [COMPLEXITY_DEFAULT]: {
    time: '00:30',
    numberOfCards: 12,
  },
  [COMPLEXITY_LOW]: {
    time: '00:30',
    numberOfCards: 12,
  },
  [COMPLEXITY_MEDIUM]: {
    time: '01:00',
    numberOfCards: 24,
  },
  [COMPLEXITY_HARD]: {
    time: '02:00',
    numberOfCards: 36,
  },
};

class Complexity {
  constructor(blockId, gameBlockId) {
    this.blockId = blockId;
    this.blockEl = document.getElementById(blockId);
    this.gameEl = document.getElementById(gameBlockId);
    this.settingsLocalStorage = Complexity._getSettingsLocalStorage();
    this.init();
  }

  init() {
    this._setClassGameElOnInit();
    this._addChangeEventListener();
    this._checkedDefault();
  }

  static _setLocalStorage(complexityName) {
    localStorage.setItem(GAME_SETTINGS_LOCAL_STORAGE, complexityName);
  }

  static _getSettingsLocalStorage() {
    return localStorage.getItem(GAME_SETTINGS_LOCAL_STORAGE);
  }

  _checkedDefault() {
    if (this.settingsLocalStorage) {
      const radioButton = document.getElementById(this.settingsLocalStorage);
      radioButton.checked = true;
    }
  }

  _setClassGameElOnInit() {
    switch (this.settingsLocalStorage) {
      case COMPLEXITY_LOW:
        this._setClassGameEl(CLASSES.GAME_LOW);
        break;
      case COMPLEXITY_MEDIUM:
        this._setClassGameEl(CLASSES.GAME_MEDIUM);
        break;
      case COMPLEXITY_HARD:
        this._setClassGameEl(CLASSES.GAME_HARD);
        break;
      default:
        break;
    }
  }

  _addChangeEventListener() {
    this.blockEl.addEventListener('change', e => {
      if (e.target.tagName !== 'INPUT') {
        return;
      }

      switch (e.target.value) {
        case COMPLEXITY_LOW:
          Complexity._setLocalStorage(COMPLEXITY_LOW);
          this._setClassGameEl(CLASSES.GAME_LOW);
          this._createEvent('low');
          break;
        case COMPLEXITY_MEDIUM:
          Complexity._setLocalStorage(COMPLEXITY_MEDIUM);
          this._setClassGameEl(CLASSES.GAME_MEDIUM);
          this._createEvent('medium');
          break;
        case COMPLEXITY_HARD:
          Complexity._setLocalStorage(COMPLEXITY_HARD);
          this._setClassGameEl(CLASSES.GAME_HARD);
          this._createEvent('hard');
          break;
        default:
          break;
      }
    });
  }

  _createEvent(detail) {
    const event = new CustomEvent(COMPLEXITY_EVENTS.CHANGE, {
      bubbles: true,
      detail: { value: detail },
    });

    this.blockEl.dispatchEvent(event);
  }

  _setClassGameEl(classGame) {
    this.gameEl.classList.remove(
      CLASSES.GAME_LOW,
      CLASSES.GAME_MEDIUM,
      CLASSES.GAME_HARD
    );

    this.gameEl.classList.add(classGame);
  }
}

export default Complexity;
