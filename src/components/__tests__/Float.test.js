import React from 'react';
import { render, cleanup, within, fireEvent } from '@testing-library/react';

import { resizeBarTypes } from '../../utils/enums';
import { testResizeBar } from '../../utils/tests';
import Float from '../Float';
import LayoutContext from '../../contexts/LayoutContext';

const fireMock = jest.fn();

const renderComponent = (props, renderFunction = render) => {
  const layoutEventsRef = React.createRef();
  layoutEventsRef.current = {
    fire: fireMock,
  };

  const { container } = renderFunction(
    <LayoutContext.Provider value={{ layoutEventsRef }}>
      <Float initialWidth={100} initialHeight={100} {...props}>
        <p>something</p>
      </Float>
    </LayoutContext.Provider>,
  );

  const [float] = container.getElementsByClassName('rdl-float');
  const queries = within(float);
  queries.container = float;
  return queries;
};

afterEach(cleanup);

beforeEach(jest.clearAllMocks);

describe('Float', () => {
  it('should render a float', () => {
    const { container, getByText } = renderComponent();

    expect(container).toBeInTheDocument();

    const content = getByText('something');

    expect(content).toBeInTheDocument();
  });

  describe('when `isOpen` prop is true', () => {
    it('should render an open float', () => {
      const { container } = renderComponent({ isOpen: true });

      expect(container).toHaveClass('rdl-float');
      expect(container).toHaveClass('rdl-float--open');
    });
  });

  describe('when `isOpen` prop changes', () => {
    it('should fire a `resize` event', () => {
      const { rerender } = renderComponent({ isOpen: true });

      renderComponent({ isOpen: false }, rerender);

      expect(fireMock).toHaveBeenCalledWith('resize');
      expect(fireMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the size is fixed', () => {
    it('should not have resizeBars', () => {
      const { container } = renderComponent({ isFixedSize: true });
      const resizeBars = container.getElementsByClassName(`rdl-resize-bar`);

      expect(resizeBars).toHaveLength(0);
    });
  });

  describe('when the dragBar is dragged', () => {
    it('should follow the mouse until is dropped', () => {
      const { container } = renderComponent();

      const [dragbar] = container.getElementsByClassName('rdl-float__drag-bar');

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
        const { container } = renderComponent({
          initialWidth: 100,
          initialHeight: 100,
          initialTop: 0,
          initialLeft: 0,
        });

        testResizeBar({
          container,
          type: resizeBarTypes.NORTH,
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
