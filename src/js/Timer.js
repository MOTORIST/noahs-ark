export const TIMER_EVENTS = {
  START: 'TIMER.START',
  END: 'TIMER.END',
};

class Timer {
  /**
   * Constructor
   * @param {string} blockId
   * @param {string} time Format: 01:23
   */
  constructor(blockId, time) {
    this.blockId = blockId;
    this.time = time;
    this.intervalId = null;
    this.allSec = Timer._getSecFromTime(time);
    this.block = document.getElementById(this.blockId);
    this._initRender(this.allSec);
  }

  start() {
    const start = Date.now();
    this._createStartEvent();
    this.intervalId = setInterval(() => this._renderEverySecond(start), 1000);
  }

  end() {
    clearInterval(this.intervalId);
    this._createEndEvent();
  }

  reset() {
    clearInterval(this.intervalId);
  }

  /**
   * @param {String} time
   */
  static _getSecFromTime(time) {
    let sec = 0;
    const arr = time.split(':');

    if (arr.length === 2) {
      sec = parseInt(arr[0], 10) * 60 + parseInt(arr[1], 10);
    }

    return sec;
  }

  /**
   * @param {Number} allSec
   */
  static _getSecFromAllSec(allSec) {
    return parseInt(allSec % 60, 10);
  }

  /**
   * @param {Number} allSec
   */
  static _getMinFromAllSec(allSec) {
    return parseInt(allSec / 60, 10);
  }

  /**
   * @param {Date} start
   */
  _renderEverySecond(start) {
    const { min, sec } = this._timeDifferenceCalculation(start);
    this._render(min, sec);
  }

  /**
   * @param {Date} start
   */
  _timeDifferenceCalculation(start) {
    const diff = this.allSec - parseInt((Date.now() - start) / 1000, 10);

    if (diff === 0) {
      this.end();
    }

    const min = parseInt(diff / 60, 10);
    const sec = parseInt(diff % 60, 10);

    return { min, sec };
  }

  /**
   * Render time
   * @param {Number} min
   * @param {Number} sec
   */
  _render(min, sec) {
    min = `0${min}`.slice(-2);
    sec = `0${sec}`.slice(-2);
    this.block.innerText = `${min}:${sec}`;
  }

  /**
   * @param {Number} allSec
   */
  _initRender(allSec) {
    this._render(
      Timer._getMinFromAllSec(allSec),
      Timer._getSecFromAllSec(allSec)
    );
  }

  _createStartEvent() {
    this.block.dispatchEvent(
      new CustomEvent(TIMER_EVENTS.START, { bubbles: true })
    );
  }

  _createEndEvent() {
    this.block.dispatchEvent(
      new CustomEvent(TIMER_EVENTS.END, { bubbles: true })
    );
  }
}

export default Timer;
