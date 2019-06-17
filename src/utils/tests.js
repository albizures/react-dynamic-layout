// eslint-disable-next-line import/no-extraneous-dependencies
import { within, render, fireEvent } from 'react-testing-library';

export const renderComponentFactory = (options, componentRender) => {
  const { defaultProps, selector } = options;
  return (props = defaultProps, renderFunction = render) => {
    const { container, debug } = renderFunction(componentRender(props));
    const [element] = container.querySelectorAll(selector);
    const queries = within(element);
    queries.container = element;
    queries.debug = () => debug(element);
    return queries;
  };
};

export const testResizeBar = ({
  container,
  type,
  down,
  move,
  up,
  moveAfterDrop,
}) => {
  const [resizeBar] = container.getElementsByClassName(
    `rdl-resize-bar--${type}`,
  );

  fireEvent.mouseDown(resizeBar, down.event);
  expect(resizeBar).toHaveStyle(down.style);

  move.forEach(({ event, style }) => {
    fireEvent.mouseMove(window, event);
    expect(resizeBar).toHaveStyle(style);
  });

  fireEvent.mouseUp(resizeBar, up.event);
  expect(resizeBar).toHaveStyle(up.style);
  expect(container).toHaveStyle(up.floatStyle);

  fireEvent.mouseUp(resizeBar, moveAfterDrop.event);
  expect(resizeBar).toHaveStyle(moveAfterDrop.style);
};
