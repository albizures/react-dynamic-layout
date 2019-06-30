declare module 'react-dynamic-layout' {
  type Dimensions = {
    height: number;
    width: number;
  };

  type ContainerRenderPropParam = {
    dimensions: Dimensions;
    id: string;
  };

  export type ContainerProps = {
    id?: string;
    isFixedSize?: boolean;
    initialSize?: string | number;
    children:
      | ((param: ContainerRenderPropParam) => JSX.Element)
      | JSX.Element[]
      | JSX.Element;
  };

  export const Container: React.SFC<ContainerProps>;

  export type LayoutProps = {
    floats?: JSX.Element[] | JSX.Element;
    type?: 'row' | 'column';
    children: JSX.Element[] | JSX.Element;
  };

  export const Layout: React.SFC<LayoutProps> & {
    ROW: 'row';
    COLUMN: 'column';
  };
}
