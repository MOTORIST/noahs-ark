import { getFixture, clearFixture, fixtureId } from '../tests/helpers/fixture';
import Timer, { TIMER_EVENTS } from './Timer';

describe('Timer', () => {
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

  describe('Init timer', () => {
    const time = '01:00';

    it('should set properties in constructor', () => {
      const timer = new Timer(fixtureId, time);

      expect(timer.blockId).toBe(fixtureId);
      expect(timer.time).toBe(time);
      expect(timer.intervalId).toBe(null);
      expect(timer.allSec).toBe(Timer._getSecFromTime(time));
      expect(timer.block).toBe(fixtureEl);
    });

    it('should call _initRender', () => {
      const initRender = jest.spyOn(Timer.prototype, '_initRender');
      // eslint-disable-next-line no-unused-vars
      const timer = new Timer(fixtureId, time);
      expect(initRender).toHaveBeenCalledTimes(1);
    });
  });

  describe('Start timer', () => {
    const time = '01:00';

    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.clearAllTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should created start event', () => {
      let startEvent = false;

      document.addEventListener(TIMER_EVENTS.START, () => {
        startEvent = true;
      });

      const timer = new Timer(fixtureId, time);
      timer.start();

      expect(startEvent).toBe(true);
    });

    it('should initialize setInterval when start timer', () => {
      const timer = new Timer(fixtureId, time);
      timer.start();
      expect(setInterval).toHaveBeenCalled();
      expect(timer.intervalId).not.toBe(null);
    });

    it('should run the _renderEverySecond in allSec * 1000 ml allSec times', () => {
      const renderEverySecondSpy = jest.spyOn(
        Timer.prototype,
        '_renderEverySecond'
      );

      const timer = new Timer(fixtureId, time);
      timer.start();

      jest.advanceTimersByTime(timer.allSec * 1000);
      expect(renderEverySecondSpy).toHaveBeenCalledTimes(timer.allSec);
    });
  });

  describe('Reset timer', () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.clearAllTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should call clearInterval function one times', () => {
      const time = '01:00';
      const timer = new Timer(fixtureId, time);
      timer.start();
      timer.reset();
      expect(clearInterval).toHaveBeenCalledTimes(1);
    });

    it('should call clearInterval function with intervalId argument', () => {
      const time = '01:00';
      const timer = new Timer(fixtureId, time);
      timer.start();
      timer.reset();

      expect(clearInterval).toHaveBeenCalledWith(timer.intervalId);
    });
  });

  describe('Render', () => {
    const time = '00:03';

    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.clearAllTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should 00:00 in 3 sec when timer init with 00:03', () => {
      let start = Date.now();

      jest.spyOn(Date, 'now').mockImplementation(() => {
        start += 1000;
        return start;
      });

      const timer = new Timer(fixtureId, time);
      timer.start();
      jest.advanceTimersByTime(3000);

      expect(fixtureEl.innerText).toBe('00:00');
    });
  });

  describe('End', () => {
    const time = '00:03';

    it('should clear interval', () => {
      const clearIntervalSpy = jest.spyOn(window, 'clearInterval');
      const timer = new Timer(fixtureId, time);
      timer.end();

      expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
    });

    it('should create end event', () => {
      let endEvent = false;

      document.addEventListener(TIMER_EVENTS.END, () => {
        endEvent = true;
      });

      const timer = new Timer(fixtureId, time);
      timer.end();

      expect(endEvent).toBe(true);
    });
  });
});
