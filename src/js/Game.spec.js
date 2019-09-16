/* eslint-disable no-unused-vars */
import { getFixture, clearFixture, fixtureId } from '../tests/helpers/fixture';
import {
  isHasClasses,
  isNotHasClasses,
  isDisabled,
  isEnabled,
} from '../tests/helpers/elements';
import Game, { GAME_EVENTS } from './Game';
import { CLASSES } from './Card';

describe('Game', () => {
  /**
   * @type {HTMLElement}
   */
  let fixtureEl;

  beforeAll(() => {
    fixtureEl = getFixture();
  });

  beforeEach(() => {
    clearFixture();
  });

  describe('Constructor', () => {
    it('should set properties in constructor', () => {
      const numberOfCards = 2;
      const game = new Game(fixtureId, numberOfCards);

      expect(game.id).toBe(fixtureId);
      expect(game.numberOfCards).toBe(numberOfCards);
      expect(game.block).toBe(fixtureEl);
      expect(game.selectedCards).toEqual([]);
      expect(game.countRightChoice).toBe(0);
      expect(Array.isArray(game.cardTypes)).toBe(true);
      expect(game.isStart).toBe(false);
    });

    it('should default set numberOfCards - 12', () => {
      const game = new Game(fixtureId);
      expect(game.numberOfCards).toBe(12);
    });

    it('should destroy battlefield', () => {
      const renderBattlefieldSpy = jest.spyOn(
        Game.prototype,
        '_destroyBattlefield'
      );

      const game = new Game(fixtureId);
      expect(renderBattlefieldSpy).toHaveBeenCalledTimes(1);
    });

    it('should render battlefield', () => {
      const renderBattlefieldSpy = jest.spyOn(
        Game.prototype,
        '_renderBattlefield'
      );

      const game = new Game(fixtureId);
      expect(renderBattlefieldSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Battlefield', () => {
    it('should render two cards', () => {
      const numberOfCards = 2;
      const game = new Game(fixtureId, numberOfCards);
      const flipCardElements = fixtureEl.querySelectorAll(
        `.${CLASSES.FLIP_CARD}`
      );

      expect(flipCardElements.length).toBe(2);
    });

    it('should render random cards', () => {
      const game01 = new Game(fixtureId);
      const types01 = [];
      const flipCardElements01 = fixtureEl.querySelectorAll(
        `.${CLASSES.FLIP_CARD}`
      );

      [...flipCardElements01].forEach(card => types01.push(card.dataset.type));

      const game02 = new Game(fixtureId);
      const types02 = [];
      const flipCardElements02 = fixtureEl.querySelectorAll(
        `.${CLASSES.FLIP_CARD}`
      );

      [...flipCardElements02].forEach(card => types02.push(card.dataset.type));

      expect(types01).not.toEqual(types02);
    });

    it('should destroy battlefield ', () => {
      const game = new Game(fixtureId);
      const flipCardElements = fixtureEl.querySelectorAll(
        `.${CLASSES.FLIP_CARD}`
      );

      expect(flipCardElements.length > 0).toBe(true);

      game._destroyBattlefield();
      const flipCardElementsAfter = fixtureEl.querySelectorAll(
        `.${CLASSES.FLIP_CARD}`
      );

      expect(flipCardElementsAfter.length === 0).toBe(true);
    });
  });

  describe('Game logic', () => {
    it('should flipped card when first click', () => {
      const game = new Game(fixtureId);
      const flipCardElement = fixtureEl.querySelector(`.${CLASSES.FLIP_CARD}`);
      const isFlipBefore = flipCardElement.classList.contains(
        CLASSES.FLIP_CARD_ACTIVE
      );

      expect(isFlipBefore).toBe(false);

      flipCardElement.click();
      const isFlipAfter = flipCardElement.classList.contains(
        CLASSES.FLIP_CARD_ACTIVE
      );

      expect(isFlipAfter).toBe(true);
    });

    it('should disabled card when click on card', () => {
      const game = new Game(fixtureId);
      const flipCardElement = fixtureEl.querySelector(`.${CLASSES.FLIP_CARD}`);
      const isDisableBefore = flipCardElement.dataset.disable;

      expect(isDisableBefore).toBeUndefined();

      flipCardElement.click();
      const isDisableAfter = flipCardElement.dataset.disable;

      expect(isDisableAfter).toBe('true');
    });

    it('should _onClickCard return false, if card disabled', () => {
      const spyClick = jest.spyOn(Game.prototype, '_onClickCard');
      const game = new Game(fixtureId);
      const flipCardElement = fixtureEl.querySelector(`.${CLASSES.FLIP_CARD}`);
      flipCardElement.dataset.disable = 'true';
      flipCardElement.click();

      expect(spyClick).toHaveReturned(undefined);
    });

    it('should create end event, if countRightChoice = numberOfCards / 2', () => {
      let isEndEvent = false;
      document.addEventListener(GAME_EVENTS.END, () => {
        isEndEvent = true;
      });
      const game = new Game(fixtureId);
      game.countRightChoice = game.numberOfCards / 2;
      const card = fixtureEl.querySelector(`.${CLASSES.FLIP_CARD}`);
      card.click();

      expect(isEndEvent).toBe(true);
    });

    it('should is end, if countRightChoice = numberOfCards / 2', () => {
      const game = new Game(fixtureId);

      expect(game.isEnd()).toBe(false);

      game.countRightChoice = game.numberOfCards / 2;

      expect(game.isEnd()).toBe(true);
    });

    describe('- right choice', () => {
      let game;
      let flipCard01;
      let flipCard02;
      let flipCard03;

      beforeAll(() => {
        game = new Game(fixtureId);
        const flipCard = fixtureEl.querySelector(`.${CLASSES.FLIP_CARD}`);
        const typeCard = flipCard.dataset.type;
        const flipCards = fixtureEl.querySelectorAll(
          `[data-type="${typeCard}"]`
        );

        [flipCard01, flipCard02] = flipCards;
        flipCard03 = fixtureEl.querySelector(
          `.${CLASSES.FLIP_CARD}:not([data-type="${typeCard}"])`
        );

        flipCard01.click();
        flipCard02.click();
      });

      it(`cards must have ${CLASSES.FLIP_CARD_SUCCESS} class`, () => {
        const isSuccessCard01 = isHasClasses(flipCard01, [
          CLASSES.FLIP_CARD_SUCCESS,
        ]);

        const isSuccessCard02 = isHasClasses(flipCard02, [
          CLASSES.FLIP_CARD_SUCCESS,
        ]);

        expect(isSuccessCard01 && isSuccessCard02).toBe(true);
      });

      it(`cards must not have ${CLASSES.FLIP_CARD_ERROR} class`, () => {
        const isErrorCard01 = isHasClasses(flipCard01, [
          CLASSES.FLIP_CARD_ERROR,
        ]);

        const isErrorCard02 = isHasClasses(flipCard02, [
          CLASSES.FLIP_CARD_ERROR,
        ]);

        expect(isErrorCard01 || isErrorCard02).toBe(false);
      });

      it('should countRightChoice = 1', () => {
        expect(game.countRightChoice).toBe(1);
      });

      describe('-- click other card (click on the third card)', () => {
        beforeAll(() => {
          flipCard03.click();
        });

        it(`cards must have ${CLASSES.FLIP_CARD_ACTIVE} class`, () => {
          const isActiveCard01 = isHasClasses(flipCard01, [
            CLASSES.FLIP_CARD_ACTIVE,
          ]);

          const isActiveCard02 = isHasClasses(flipCard02, [
            CLASSES.FLIP_CARD_ACTIVE,
          ]);

          expect(isActiveCard01 && isActiveCard02).toBe(true);
        });

        it('card 1 and card 2 must be disabled', () => {
          const isDisabledCard01 = isDisabled(flipCard01);
          const isDisabledCard02 = isDisabled(flipCard02);

          expect(isDisabledCard01 && isDisabledCard02).toBe(true);
        });
      });
    });

    describe('- incorrect choice', () => {
      let game;
      let flipCard01;
      let flipCard02;
      let flipCard03;

      beforeAll(() => {
        game = new Game(fixtureId);
        flipCard01 = fixtureEl.querySelector(`.${CLASSES.FLIP_CARD}`);
        const typeCard = flipCard01.dataset.type;
        const flipCards = fixtureEl.querySelectorAll(
          `.${CLASSES.FLIP_CARD}:not([data-type="${typeCard}"])`
        );

        [flipCard02, flipCard03] = flipCards;

        flipCard01.click();
        flipCard02.click();
      });

      it(`cards must have ${CLASSES.FLIP_CARD_ERROR} class`, () => {
        const isErrorCard01 = flipCard01.classList.contains(
          CLASSES.FLIP_CARD_ERROR
        );

        const isErrorCard02 = flipCard02.classList.contains(
          CLASSES.FLIP_CARD_ERROR
        );

        expect(isErrorCard01 && isErrorCard02).toBe(true);
      });

      it(`cards must not have ${CLASSES.FLIP_CARD_SUCCESS} class`, () => {
        const isSuccessCard01 = flipCard01.classList.contains(
          CLASSES.FLIP_CARD_SUCCESS
        );

        const isSuccessCard02 = flipCard02.classList.contains(
          CLASSES.FLIP_CARD_SUCCESS
        );

        expect(isSuccessCard01 || isSuccessCard02).toBe(false);
      });

      describe('-- click other card (click on the third card)', () => {
        beforeAll(() => {
          flipCard03.click();
        });

        it(`should remove classes ${CLASSES.FLIP_CARD_ACTIVE}, ${CLASSES.FLIP_CARD_ERROR}`, () => {
          const hasClasses = [
            CLASSES.FLIP_CARD_ACTIVE,
            CLASSES.FLIP_CARD_ERROR,
          ];
          const hasClassesCard01 = isNotHasClasses(flipCard01, hasClasses);
          const hasClassesCard02 = isNotHasClasses(flipCard02, hasClasses);

          expect(hasClassesCard01 && hasClassesCard02).toBe(true);
        });

        it('card 1 and card 2 must be enabled', () => {
          const isDisabledCard01 = isEnabled(flipCard01);
          const isDisabledCard02 = isEnabled(flipCard02);

          expect(isDisabledCard01 && isDisabledCard02).toBe(true);
        });
      });
    });
  });
});
