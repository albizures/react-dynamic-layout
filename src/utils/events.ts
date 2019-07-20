// @ts-check
import { removeArrayItem } from '.';

type OnEvent = (evetName: string, listener: Function) => void;
type OffEvent = (evetName: string, listener: Function) => void;
type FireEvent = (evetName: string, data?: any) => void;

interface Events {
  [key: string]: Function[];
}

interface EventSystem {
  events: Events;
  on: OnEvent;
  off: OffEvent;
  fire: FireEvent;
}

interface PartialEventSystem {
  events: Events;
  on?: OnEvent;
  off?: OffEvent;
  fire?: FireEvent;
}

type OnEventFactorty = (eventSystem: PartialEventSystem) => OnEvent;
type OffEventFactorty = (eventSystem: PartialEventSystem) => OffEvent;
type FireEventFactorty = (eventSystem: PartialEventSystem) => FireEvent;

const checkEvent = (eventSystem: object, event: string): void => {
  if (!eventSystem[event]) {
    eventSystem[event] = [];
  }
};

const createEventSystem = (): PartialEventSystem => ({
  events: {},
});

const onFactory: OnEventFactorty = (eventSystem) => (eventName, listener) => {
  const { events } = eventSystem;
  checkEvent(events, eventName);
  const listeners = events[eventName];
  if (!listeners.includes(listener)) {
    listeners.push(listener);
  }
};

const offFactory: OffEventFactorty = (eventSystem) => (eventName, listener) => {
  const { events } = eventSystem;
  checkEvent(events, eventName);

  events[eventName] = removeArrayItem(events[eventName], listener);
};

const fireFactory: FireEventFactorty = (eventSystem) => (eventName, data) => {
  const { events } = eventSystem;
  checkEvent(events, eventName);
  events[eventName].forEach((listener) => listener(data));
};

export {
  createEventSystem,
  onFactory,
  offFactory,
  fireFactory,
  EventSystem,
  PartialEventSystem,
};
