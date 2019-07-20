import '@testing-library/jest-dom/extend-expect';
import {
  within,
  render,
  fireEvent,
  BoundFunctions,
  Queries,
} from '@testing-library/react';

type TestQueries = BoundFunctions<Queries> & {
  container: Element;
  debug: Function;
};

interface Options {
  defaultProps: object;
  selector: string;
}

type RenderComponentFactory = (
  options: Options,
  componentRender: Function,
) => (props: object, renderFunction: Function) => TestQueries;

export const renderComponentFactory: RenderComponentFactory = (
  options,
  componentRender,
) => {
  const { defaultProps, selector } = options;
  return (props = defaultProps, renderFunction = render) => {
    const { container, debug } = renderFunction(componentRender(props));
    const element = container.querySelectorAll(selector)[0];
    const queries: unknown = within(element as HTMLElement);
    (queries as TestQueries).container = element;
    (queries as TestQueries).debug = () => debug(element as HTMLElement);
    return queries as TestQueries;
  };
};

export const testResizeBar = ({
  container,
  type,
  down,
  move,
  up,
  moveAfterDrop,
}): void => {
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
