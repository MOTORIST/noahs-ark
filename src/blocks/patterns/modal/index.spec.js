import Modal from './index';
import { getFixture, clearFixture } from '../../../tests/helpers/fixture';

describe('Modal', () => {
  let fixtureEl;

  beforeAll(() => {
    fixtureEl = getFixture();
  });

  afterEach(() => {
    clearFixture();
  });

  it('should open modal', () => {
    fixtureEl.innerHTML =
      '<div id="modal" class="Modal"><div class="Modal-Content" /></div>';

    const modalEl = document.getElementById('modal');
    const modal = new Modal('modal');
    modal.open();

    expect(modalEl.classList.contains('Modal_isVisibility')).toBe(true);
  });

  it('should close modal', () => {
    fixtureEl.innerHTML =
      '<div id="modal" class="Modal Modal_isVisibility"><div class="Modal-Content" /></div>';

    const modalEl = document.getElementById('modal');
    const modal = new Modal('modal');
    modal.close();

    expect(modalEl.classList.contains('Modal_isVisibility')).toBe(false);
  });

  it('should close modal, when click on elements with attribute data-dismiss="modal" in modal', () => {
    fixtureEl.innerHTML = `
      <div id="modal" class="Modal">
        <div class="Modal-Content">
          <button id="btn" data-dismiss="modal">Close</button>
        </div>
      </div>`;

    const btnEl = document.getElementById('btn');
    const modalEl = document.getElementById('modal');
    const modal = new Modal('modal');
    modal.open();

    btnEl.dispatchEvent(new Event('click', { bubbles: true }));

    expect(modalEl.classList.contains('Modal_isVisibility')).toBe(false);
  });
});
