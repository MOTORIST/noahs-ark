import Complexity from './Complexity';
import { getFixture, clearFixture, fixtureId } from '../tests/helpers/fixture';
import { CLASSES } from './Game';
import {
  COMPLEXITY_LOW,
  COMPLEXITY_MEDIUM,
  COMPLEXITY_HARD,
  GAME_SETTINGS_LOCAL_STORAGE,
} from './constants';

describe('Complexity', () => {
  const complexityId = 'complexity';
  const gameId = 'game';

  /**
   * @type {HTMLElement}
   */
  let fixtureEl;

  /**
   * @type {HTMLElement}
   */
  let gameEl;

  /**
   * @type {HTMLElement}
   */
  let complexityEl;

  /**
   * @type {HTMLElement}
   */
  let lowRadioBtnEl;

  /**
   * @type {HTMLElement}
   */
  let mediumRadioBtnEl;

  /**
   * @type {HTMLElement}
   */
  let hardRadioBtnEl;

  beforeAll(() => {
    fixtureEl = getFixture();
  });

  beforeEach(() => {
    clearFixture();
    gameEl = document.createElement('div');
    gameEl.classList.add(CLASSES.GAME, CLASSES.GAME_LOW);
    gameEl.setAttribute('id', gameId);
    fixtureEl.appendChild(gameEl);

    const complexitySwitch = `
    <div id="complexity" class="ComplexitySwitch">
        <div class="FormField">
            <div class="Radio">
                <input class="Radio-Input" type="radio" name="complexity" value="${COMPLEXITY_LOW}" id="${COMPLEXITY_LOW}" checked>
                <div class="Radio-Icon">
                    <div class="Radio-IconOuter"></div>
                    <div class="Radio-IconInner"></div>
                </div>
            </div>
            <label for="${COMPLEXITY_LOW}">low</label>
        </div>
        <div class="FormField">
            <div class="Radio">
                <input class="Radio-Input" type="radio" name="complexity" value="${COMPLEXITY_MEDIUM}" id="${COMPLEXITY_MEDIUM}">
                <div class="Radio-Icon">
                    <div class="Radio-IconOuter"></div>
                    <div class="Radio-IconInner"></div>
                </div>
            </div>
            <label for="${COMPLEXITY_MEDIUM}">medium</label>
        </div>
        <div class="FormField">
            <div class="Radio">
                <input class="Radio-Input" type="radio" name="complexity" value="${COMPLEXITY_HARD}" id="${COMPLEXITY_HARD}">
                <div class="Radio-Icon">
                    <div class="Radio-IconOuter"></div>
                    <div class="Radio-IconInner"></div>
                </div>
            </div>
            <label for="${COMPLEXITY_HARD}">hard</label>
        </div>
    </div>
    `;

    const complexityWrapper = document.createElement('div');
    complexityWrapper.innerHTML = complexitySwitch;
    fixtureEl.appendChild(complexityWrapper);

    complexityEl = document.getElementById(complexityId);
    lowRadioBtnEl = document.getElementById(COMPLEXITY_LOW);
    mediumRadioBtnEl = document.getElementById(COMPLEXITY_MEDIUM);
    hardRadioBtnEl = document.getElementById(COMPLEXITY_HARD);
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Constructor', () => {
    let complexity;

    beforeEach(() => {
      complexity = new Complexity(complexityId);
    });

    it('should set property blockId', () => {
      expect(complexity.blockId).toBe(complexityId);
    });

    it('should set block element', () => {
      expect(complexity.blockEl).toEqual(complexityEl);
    });
  });

  it('should change class game block when click on radio button', () => {
    // eslint-disable-next-line no-unused-vars
    const complexity = new Complexity(fixtureId, gameId);

    hardRadioBtnEl.click();
    const isHasHardClass = gameEl.classList.contains(CLASSES.GAME_HARD);
    expect(isHasHardClass).toBe(true);

    mediumRadioBtnEl.click();
    const isHasMediumClass = gameEl.classList.contains(CLASSES.GAME_MEDIUM);
    expect(isHasMediumClass).toBe(true);

    lowRadioBtnEl.click();
    const isHasLowClass = gameEl.classList.contains(CLASSES.GAME_LOW);
    expect(isHasLowClass).toBe(true);
  });

  it('should set game settings in localStorage when click on radio button', () => {
    // eslint-disable-next-line no-unused-vars
    const complexity = new Complexity(fixtureId, gameId);
    hardRadioBtnEl.click();
    const settings = localStorage.getItem(GAME_SETTINGS_LOCAL_STORAGE);
    expect(settings).toBe(COMPLEXITY_HARD);
  });

  it('should selected medium radio button, if is set game settings of localStorage ', () => {
    localStorage.setItem(GAME_SETTINGS_LOCAL_STORAGE, COMPLEXITY_MEDIUM);
    // eslint-disable-next-line no-unused-vars
    const complexity = new Complexity(fixtureId, gameId);
    expect(mediumRadioBtnEl.checked).toBe(true);
  });

  it('should default checked radio button low complexity', () => {
    // eslint-disable-next-line no-unused-vars
    const complexity = new Complexity(fixtureId, gameId);

    expect(lowRadioBtnEl.checked).toBe(true);
  });
});
