import React from 'react';
import { fireEvent } from '@testing-library/react';

import ResizeBar from '../ResizeBar';
import { resizeBarTypes } from '../../utils/enums';
import { renderComponentFactory } from '../../utils/tests';

const defaultProps = {
  onSizeChange: () => ({}),
  type: resizeBarTypes.NORTH,
};

const renderComponent = renderComponentFactory(
  {
    defaultProps,
    selector: '.rdl-resize-bar',
  },
  (props) => <ResizeBar {...props} />,
);

describe('ResizeBar', () => {
  it('should render a resize bar', () => {
    const { container } = renderComponent();

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('rdl-resize-bar');
  });

  it('should render a resize bar of the given type', () => {
    const type = resizeBarTypes.SOUTH_WEST;
    const { container } = renderComponent({ type, onSizeChange: () => ({}) });

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(`rdl-resize-bar--${type}`);
  });

  it('should call onSizeChange with the change until the last change', () => {
    const type = resizeBarTypes.SOUTH_WEST;
    const onSizeChange = jest.fn();
    const { container } = renderComponent({ type, onSizeChange });

    fireEvent.mouseDown(container, {
      clientX: 100,
      clientY: 100,
    });

    expect(onSizeChange).not.toHaveBeenCalled();

    fireEvent.mouseMove(window, { clientX: 101, clientY: 101 });

    expect(onSizeChange).not.toHaveBeenCalled();

    fireEvent.mouseUp(window, { clientX: 103, clientY: 103 });

    expect(onSizeChange).toHaveBeenCalled();
    expect(onSizeChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        left: 3,
        bottom: -3,
      }),
    );
  });
});
