import React from 'react';
import {
  offFactory,
  onFactory,
  fireFactory,
  EventSystem,
  createEventSystem,
} from '../utils/events';

interface LayoutEventSystem {
  layoutEventsRef: React.RefObject<EventSystem>;
  containersEventsRef: React.RefObject<EventSystem>;
}

const useEventSystem = (): LayoutEventSystem => {
  const layout = createEventSystem();
  const containers = createEventSystem();

  layout.off = React.useCallback(offFactory(layout), []);
  layout.on = React.useCallback(onFactory(layout), []);
  layout.fire = React.useCallback(fireFactory(layout), []);

  containers.off = React.useCallback(offFactory(containers), []);
  containers.on = React.useCallback(onFactory(containers), []);
  containers.fire = React.useCallback(fireFactory(containers), []);

  return {
    layoutEventsRef: React.useRef(layout as EventSystem),
    containersEventsRef: React.useRef(containers as EventSystem),
  };
};

export default useEventSystem;
