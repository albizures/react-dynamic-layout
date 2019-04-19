// @ts-check
import { removeArrayItem } from '.';

/**
 * @callback OnEvent
 * @param {string} eventName
 * @param {Function} listener
 */

/**
 * @callback OffEvent
 * @param {string} eventName
 * @param {Function} listener
 */

/**
 * @callback FireEvent
 * @param {string} eventName
 * @param {any} [data]
 */

/**
 * @typedef {object} EventSystem
 * @property {object} events
 * @property {OnEvent} [on]
 * @property {OffEvent} [off]
 * @property {FireEvent} [fire]
 */

const checkEvent = (eventSystem, event) => {
  if (!eventSystem[event]) {
    eventSystem[event] = [];
  }
};

/**
 * @returns {EventSystem}
 */
export const createEventSystem = () => ({
  events: {},
});

/**
 *
 * @param {EventSystem} eventSystem
 * @returns {OnEvent}
 */
export const onFactory = (eventSystem) => (eventName, listener) => {
  checkEvent(eventSystem, eventName);
  const listeners = eventSystem[eventName];
  if (!listeners.includes(listener)) {
    listeners.push(listener);
  }
};

/**
 *
 * @param {EventSystem} eventSystem
 * @returns {OffEvent}
 */
export const offFactory = (eventSystem) => (eventName, listener) => {
  checkEvent(eventSystem, eventName);

  eventSystem[eventName] = removeArrayItem(eventSystem[eventName], listener);
};

/**
 *
 * @param {EventSystem} eventSystem
 * @returns {FireEvent}
 */
export const fireFactory = (eventSystem) => (eventName, data) => {
  checkEvent(eventSystem, eventName);
  eventSystem[eventName].forEach((listener) => listener(data));
};
