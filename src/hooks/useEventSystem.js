import React from 'react';
import * as events from '../utils/events';

const useEventSystem = () => {
  const layout = events.createEventSystem();
  const containers = events.createEventSystem();

  layout.off = React.useCallback(events.offFactory(layout), []);
  layout.on = React.useCallback(events.onFactory(layout), []);
  layout.fire = React.useCallback(events.fireFactory(layout), []);

  containers.off = React.useCallback(events.offFactory(containers), []);
  containers.on = React.useCallback(events.onFactory(containers), []);
  containers.fire = React.useCallback(events.fireFactory(containers), []);

  return {
    layoutEventsRef: React.useRef(layout),
    containersEventsRef: React.useRef(containers),
  };
};

export default useEventSystem;
