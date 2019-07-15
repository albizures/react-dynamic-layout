// @ts-check
import {
  createEventSystem,
  offFactory,
  onFactory,
  fireFactory,
} from '../events';

describe('events', () => {
  describe('#createEventSystem', () => {
    it('should create a new event system', () => {
      const eventSystem = createEventSystem();
      expect(typeof eventSystem.events).toBe('object');
    });
  });

  describe('#offFactory', () => {
    it('should create an off function', () => {
      const eventSystem = createEventSystem();
      const listener = jest.fn();
      eventSystem.events.test = [listener];

      const off = offFactory(eventSystem);

      off('test', listener);
      expect(eventSystem.events.test).toHaveLength(0);
    });
  });

  describe('#onFactory', () => {
    it('should create an on function', () => {
      const eventSystem = createEventSystem();
      const on = onFactory(eventSystem);
      const listener = jest.fn();

      on('test', listener);

      expect(eventSystem.events.test).toEqual([listener]);
    });

    describe('when the given listener is already added', () => {
      it('should not added again', () => {
        const eventSystem = createEventSystem();
        const listener = jest.fn();
        const on = onFactory(eventSystem);

        eventSystem.events.test = [listener];

        on('test', listener);

        expect(eventSystem.events.test).toEqual([listener]);
      });
    });
  });

  describe('fireFactory', () => {
    it('should call every listener for the given event', () => {
      const eventSystem = createEventSystem();
      const fire = fireFactory(eventSystem);
      const listener = jest.fn();

      eventSystem.events.test = [listener];

      const data = {};

      fire('test', data);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(data);
    });
  });
});
