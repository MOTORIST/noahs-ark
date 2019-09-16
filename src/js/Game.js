import Card from './Card';
import cardTypes from './cardTypes';
import { getRandomArrayElements, shuffle } from './utils';

export const CLASSES = {
  GAME: 'Game-Battlefield',
  GAME_LOW: 'Game_low',
  GAME_MEDIUM: 'Game_medium',
  GAME_HARD: 'Game_hard',
  FLIP_CARD_ERROR: 'FlipCard_error',
  FLIP_CARD_ACTIVE: 'FlipCard_active',
  FLIP_CARD_SUCCESS: 'FlipCard_success',
};

export const GAME_EVENTS = {
  START: 'GAME.START',
  END: 'GAME.END',
};

class Game {
  /**
   * @param {string} id block id
   * @param {number} numberOfCards
   */
  constructor(id, numberOfCards = 12) {
    this.id = id;
    this.numberOfCards = numberOfCards;
    this.block = document.getElementById(this.id);
    this.selectedCards = [];
    this.countRightChoice = 0;
    this.cardTypes = cardTypes;
    this.isStart = false;
    this._destroyBattlefield();
    this._renderBattlefield();
  }

  isEnd = () => this.countRightChoice === this.numberOfCards / 2;

  static _removeErrorClasses(cards) {
    cards.forEach(card => card.classList.remove(CLASSES.FLIP_CARD_ERROR));
  }

  static _removeActiveClass(cards) {
    cards.forEach(card => card.classList.remove(CLASSES.FLIP_CARD_ACTIVE));
  }

  static _activateCard(e) {
    e.currentTarget.classList.add(CLASSES.FLIP_CARD_ACTIVE);
  }

  static _disabledCard(e) {
    e.currentTarget.dataset.disable = true;
  }

  static _enableCards(cards) {
    cards.forEach(card => {
      card.dataset.disable = false;
    });
  }

  static _setSuccessClasses(cards) {
    cards.forEach(card => card.classList.add(CLASSES.FLIP_CARD_SUCCESS));
  }

  static _setErrorClasses(cards) {
    cards.forEach(card => card.classList.add(CLASSES.FLIP_CARD_ERROR));
  }

  _renderBattlefield() {
    const gameEl = document.createElement('div');
    gameEl.classList.add(CLASSES.GAME);
    this.block.appendChild(gameEl);
    this._renderRandomCards(gameEl);
  }

  _renderRandomCards(gameEl) {
    this._randomCards().forEach(
      type => new Card(gameEl, type, this._onClickCard.bind(this))
    );
  }

  _destroyBattlefield() {
    this.block.innerHTML = '';
  }

  _onClickCard(e) {
    if (e.currentTarget.dataset.disable === 'true') {
      return;
    }

    Game._disabledCard(e);
    Game._activateCard(e);
    this._addSelectedCard(e);

    if (this.selectedCards.length === 2) {
      this._rightСhoice();
      this._incorrectChoice();
    }

    if (this.selectedCards.length === 3) {
      this._setInitialStateCards();
    }

    if (this.isEnd()) {
      this._createEndEvent();
    }

    if (!this.isStart) {
      this.isStart = true;
      this._createStartEvent();
    }
  }

  _rightСhoice() {
    if (
      this.selectedCards.length === 2 &&
      this.selectedCards[0].dataset.type === this.selectedCards[1].dataset.type
    ) {
      Game._setSuccessClasses(this.selectedCards);
      Game._removeErrorClasses(this.selectedCards);
      this.selectedCards = [];
      this.countRightChoice += 1;
    }
  }

  _incorrectChoice() {
    if (
      this.selectedCards.length === 2 &&
      this.selectedCards[0].dataset.type !== this.selectedCards[1].dataset.type
    ) {
      Game._setErrorClasses(this.selectedCards.slice(0, 2));
    }
  }

  _createStartEvent() {
    this.block.dispatchEvent(
      new CustomEvent(GAME_EVENTS.START, {
        bubbles: true,
      })
    );
  }

  _createEndEvent() {
    this.block.dispatchEvent(
      new CustomEvent(GAME_EVENTS.END, {
        bubbles: true,
      })
    );
  }

  _setInitialStateCards() {
    const cards = this.selectedCards.slice(0, 2);
    Game._removeErrorClasses(cards);
    Game._removeActiveClass(cards);
    Game._enableCards(cards);
    this.selectedCards.splice(-0, 2);
  }

  _addSelectedCard(e) {
    this.selectedCards.push(e.currentTarget);
  }

  _randomCards() {
    const array = getRandomArrayElements(
      this.cardTypes,
      this.numberOfCards / 2
    );

    array.concat(array);

    return shuffle(array.concat(array));
  }
}

export default Game;
