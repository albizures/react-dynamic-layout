import React from 'react';
import { LayoutType } from '../types';
import { EventSystem } from '../utils/events';

const initialValue = {
  isRoot: true,
  type: LayoutType.ROW,
  layoutEventsRef: React.createRef<EventSystem>(),
  containersEventsRef: React.createRef<EventSystem>(),
  variableContainersRef: React.createRef<string[]>(),
};

interface LayoutState {
  isRoot: boolean;
  type: LayoutType;
  layoutEventsRef: React.RefObject<EventSystem>;
  containersEventsRef: React.RefObject<EventSystem>;
  variableContainersRef: React.RefObject<string[]>;
}

const LayoutContext = React.createContext<LayoutState>(initialValue);

export { LayoutState };
export default LayoutContext;
