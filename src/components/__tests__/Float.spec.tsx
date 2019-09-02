import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {
  render,
  cleanup,
  within,
  fireEvent,
  BoundFunctions,
  Queries,
} from '@testing-library/react';

import { ResizeBarTypes } from '../../utils/enums';
import { testResizeBar } from '../../utils/tests';
import Float from '../Float';
import LayoutContext, { LayoutState } from '../../contexts/LayoutContext';
import Dragbar from '../Float/Dragbar';
import { LayoutType } from '../../types';
import { EventSystem } from '../../utils/events';

const layoutEventsMock: EventSystem = {
  fire: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  events: {},
};

const containerEventsMock: EventSystem = {
  fire: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  events: {},
};

type TestQueries = BoundFunctions<Queries> & {
  container: Element;
  rerender: Function;
};

function createRef<T>(value: T): React.MutableRefObject<T> {
  const variableContainersRef: React.MutableRefObject<T> = React.createRef();
  variableContainersRef.current = value;

  return variableContainersRef;
}

const renderComponent = (props?): React.ReactElement => {
  const layoutEventsRef = createRef(layoutEventsMock as EventSystem);
  const containersEventsRef = createRef(containerEventsMock);
  const variableContainersRef = createRef([]);

  variableContainersRef.current = [];

  const contextValue: LayoutState = {
    isRoot: false,
    type: LayoutType.ROW,
    layoutEventsRef,
    containersEventsRef,
    variableContainersRef,
  };

  return (
    <LayoutContext.Provider value={contextValue}>
      <Float initialWidth={100} initialHeight={100} {...props}>
        <p>something</p>
      </Float>
    </LayoutContext.Provider>
  );
};

const getQueries = (props?): TestQueries => {
  const { container, rerender } = render(renderComponent(props));
  const float = container.getElementsByClassName('rdl-float')[0];
  const queries: unknown = within(float as HTMLElement);
  (queries as TestQueries).container = float;
  (queries as TestQueries).rerender = rerender;
  return queries as TestQueries;
};

afterEach(cleanup);

beforeEach(jest.clearAllMocks);

describe('Float', () => {
  it('should render a float', () => {
    const { container, getByText } = getQueries();

    expect(container).toBeInTheDocument();

    const content = getByText('something');

    expect(content).toBeInTheDocument();
  });

  describe('when `isOpen` prop is true', () => {
    it('should render an open float', () => {
      const { container } = getQueries({ isOpen: true });

      expect(container).toHaveClass('rdl-float');
      expect(container).toHaveClass('rdl-float--open');
    });
  });

  describe('when `isOpen` prop changes', () => {
    it('should fire a `resize` event', () => {
      const { rerender } = getQueries({ isOpen: true });

      rerender(renderComponent({ isOpen: false }));

      expect(layoutEventsMock.fire).toHaveBeenCalledWith('resize');
      expect(layoutEventsMock.fire).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the size is fixed', () => {
    it('should not have resizeBars', () => {
      const { container } = getQueries({ isFixedSize: true });
      const resizeBars = container.getElementsByClassName(`rdl-resize-bar`);

      expect(resizeBars).toHaveLength(0);
    });
  });

  describe('when the dragBar is dragged', () => {
    it('should follow the mouse until is dropped', () => {
      const onClose = jest.fn();
      const { container } = getQueries({
        dragbar: <Dragbar onClose={onClose} />,
      });

      const dragbar = container.getElementsByClassName(
        'rdl-float__drag-bar',
      )[0];

      fireEvent.mouseDown(dragbar, { clientX: 10, clientY: 10 });
      fireEvent.mouseMove(window, { clientX: 11, clientY: 11 });

      expect(container).toHaveStyle(`
        top: 1px;
        left: 1px;
      `);

      fireEvent.mouseMove(window, { clientX: 20, clientY: 20 });

      expect(container).toHaveStyle(`
        top: 10px;
        left: 10px;
      `);

      fireEvent.mouseUp(window, { clientX: 20, clientY: 20 });

      // this last event shouldn't have any effect
      fireEvent.mouseMove(window, { clientX: 25, clientY: 25 });

      expect(container).toHaveStyle(`
        top: 10px;
        left: 10px;
      `);
    });
  });

  describe('when a resizeBar is dragged', () => {
    test.todo('add test for all resizeBars');
    describe('when the north resizeBar is dragged', () => {
      it('should change its vertical size and position properly', () => {
        const { container } = getQueries({
          initialWidth: 100,
          initialHeight: 100,
          initialTop: 0,
          initialLeft: 0,
        });

        testResizeBar({
          container,
          type: ResizeBarTypes.NORTH,
          down: {
            style: '',
            event: { clientX: 100, clientY: 100 },
          },
          move: [
            {
              event: { clientX: 101, clientY: 101 },
              style: `
                top: 1px;
              `,
            },
            {
              event: { clientX: 110, clientY: 110 },
              style: `
                top: 10px;
              `,
            },
          ],
          up: {
            event: { clientX: 110, clientY: 110 },
            style: '',
            floatStyle: `
              top: 10px;
              height: 90px;
              width: 100px;
              left: 0;
            `,
          },
          moveAfterDrop: {
            event: { clientX: 110, clientY: 110 },
            style: '',
          },
        });
      });
    });
  });
});
