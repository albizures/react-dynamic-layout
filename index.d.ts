import {
  Dimensions,
  Container,
  ContainerProps,
  ContainerRenderPropParam,
  Layout,
  LayoutProps,
} from './src/types';

declare module 'react-dynamic-layout' {
  const Container: Container;

  const Layout: Layout;

  export {
    Dimensions,
    ContainerRenderPropParam,
    Container,
    ContainerProps,
    LayoutProps,
    Layout,
  };
}
