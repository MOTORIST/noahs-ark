export const CLASSES = {
  GRID_COL_1: 'Grid_col_1',
  FLIP_CARD: 'FlipCard',
  FLIP_CARD_ANIMATION: 'FlipCard_animation',
  FLIP_CARD_CONTENT: 'FlipCard-Content',
  FLIP_CARD_FRONT: 'FlipCard-Front',
  FLIP_CARD_BACK: 'FlipCard-Back',
  FLIP_CARD_ACTIVE: 'FlipCard_active',
  FLIP_CARD_SUCCESS: 'FlipCard_success',
  FLIP_CARD_ERROR: 'FlipCard_error',
  ICON: 'Icon',
  ICON_RESPONSE: 'Icon_response',
};

class Card {
  constructor(wrapperElement, type, onClick = null) {
    this.wrapperElement = wrapperElement;
    this.svgName = `#${type}`;
    this.type = type;
    this.onClick = onClick;
    this._render();
  }

  static _createElement(className, tag = 'div') {
    const el = document.createElement(tag);
    const classes = className.split(' ');
    el.classList.add(...classes);

    return el;
  }

  _createSVG() {
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgEl.classList.add(CLASSES.ICON, CLASSES.ICON_RESPONSE);

    const useEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    useEl.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'xlink:href',
      this.svgName
    );
    svgEl.appendChild(useEl);

    return svgEl;
  }

  _render() {
    this.flipCard = Card._createElement(
      `${CLASSES.GRID_COL_1} ${CLASSES.FLIP_CARD} ${CLASSES.FLIP_CARD_ANIMATION}`
    );
    const flipCardContent = Card._createElement(CLASSES.FLIP_CARD_CONTENT);
    const flipCardFront = Card._createElement(CLASSES.FLIP_CARD_FRONT);
    const flipCardEnd = Card._createElement(CLASSES.FLIP_CARD_BACK);
    const svg = this._createSVG();

    if (this.onClick) {
      this.flipCard.addEventListener('click', this.onClick);
    }

    this.flipCard.dataset.type = this.type;

    flipCardEnd.appendChild(svg);
    flipCardContent.appendChild(flipCardFront);
    flipCardContent.appendChild(flipCardEnd);
    this.flipCard.appendChild(flipCardContent);
    this.wrapperElement.appendChild(this.flipCard);
  }
}

export default Card;
