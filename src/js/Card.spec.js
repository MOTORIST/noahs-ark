import { getFixture, clearFixture, fixtureId } from '../tests/helpers/fixture';
import Card, { CLASSES } from './Card';

describe('Card', () => {
  beforeAll(() => {
    getFixture();
  });

  beforeEach(() => {
    clearFixture();
  });

  it('should created object with attributes', () => {
    const spy = jest.spyOn(Card.prototype, '_render');
    const el = document.getElementById(fixtureId);
    const type = 'cat';
    const mockOnClick = jest.fn();
    const card = new Card(el, type, mockOnClick);

    expect(card.wrapperElement).toEqual(el);
    expect(card.svgName).toBe(`#${type}`);
    expect(card.type).toBe(type);
    expect(card.onClick).toBe(mockOnClick);
    expect(spy).toHaveBeenCalled();
  });

  it('should created element with class', () => {
    const className = 'testClass';
    const tag = 'button';
    const el = Card._createElement(className, tag);

    expect(el.localName).toBe(tag);
    expect(el.classList.contains(className)).toBe(true);
  });

  it('should create svg element', () => {
    const el = document.getElementById(fixtureId);
    const type = 'cat';
    const card = new Card(el, type);
    const svgEl = card._createSVG();
    const useEl = svgEl.querySelector('use');

    expect(svgEl.localName).toBe('svg');
    expect(svgEl.classList.contains(CLASSES.ICON)).toBe(true);
    expect(svgEl.classList.contains(CLASSES.ICON_RESPONSE)).toBe(true);
    expect(useEl.getAttribute('xlink:href')).toBe(`#${type}`);
  });

  it('should render html elements', () => {
    /**
     * render html
     * <div class="FlipCard FlipCard_animation" data-type="dog">
        <div class="FlipCard-Content">
          <div class="FlipCard-Front"></div>
          <div class="FlipCard-Back">
            <svg class="Icon Icon_response">
              <use xlink:href="#dog"></use>
            </svg>
          </div>
        </div>
      </div>
     */
    const el = document.getElementById(fixtureId);
    const type = 'dog';
    const spy = jest.spyOn(Card.prototype, '_render');
    const mockOnClick = jest.fn();
    // eslint-disable-next-line no-unused-vars
    const card = new Card(el, type, mockOnClick);
    const flipCardEl = el.querySelector(`.${CLASSES.FLIP_CARD}`);
    const flipCardContentEl = flipCardEl.querySelector(
      `.${CLASSES.FLIP_CARD_CONTENT}`
    );
    const flipCardFrontEl = flipCardContentEl.querySelector(
      `.${CLASSES.FLIP_CARD_FRONT}`
    );
    const flipCardBackEl = flipCardContentEl.querySelector(
      `.${CLASSES.FLIP_CARD_BACK}`
    );
    const svgEl = flipCardBackEl.querySelector('svg');

    flipCardEl.click();

    expect(spy).toHaveBeenCalled();

    expect(el.contains(flipCardEl)).toBe(true);
    expect(flipCardEl.contains(flipCardContentEl)).toBe(true);
    expect(flipCardContentEl.contains(flipCardFrontEl)).toBe(true);
    expect(flipCardContentEl.contains(flipCardBackEl)).toBe(true);
    expect(flipCardBackEl.contains(svgEl)).toBe(true);

    expect(flipCardEl.dataset.type).toBe(type);
    expect(flipCardEl.getAttribute('class')).toBe(
      `${CLASSES.GRID_COL_1} ${CLASSES.FLIP_CARD} ${CLASSES.FLIP_CARD_ANIMATION}`
    );
  });
});
