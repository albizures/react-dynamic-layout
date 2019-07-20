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
import LayoutContext from '../../contexts/LayoutContext';
import { LayoutType } from '../../types';

const layoutEventfireMock = jest.fn();
const containerEventfireMock = jest.fn();

type TestQueries = BoundFunctions<Queries> & {
  container: Element;
  rerender: Function;
};

const createEventSystem = (mock: object): React.MutableRefObject<object> => {
  const layoutEventsRef: React.MutableRefObject<object> = React.createRef();
  layoutEventsRef.current = mock;

  return layoutEventsRef;
};

const renderComponent = (props?): React.ReactElement => {
  const layoutEventsRef = createEventSystem({ fire: layoutEventfireMock });
  const containersEventsRef = createEventSystem({
    fire: containerEventfireMock,
  });
  const variableContainersRef = createEventSystem([]);

  const contextValue = {
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

      expect(layoutEventfireMock).toHaveBeenCalledWith('resize');
      expect(layoutEventfireMock).toHaveBeenCalledTimes(1);
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
      const { container } = getQueries();

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
