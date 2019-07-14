type LayoutType = 'row' | 'column';
type Dimensions = {
  height: number;
  width: number;
};

type ContainerRenderPropParam = {
  dimensions: Dimensions;
  id: string;
};

type ContainerProps = {
  id?: string;
  isFixedSize?: boolean;
  initialSize?: string | number;
  children:
    | ((param: ContainerRenderPropParam) => React.ReactNode)
    | React.ReactNode;
};

type Container = React.FC<ContainerProps>;

type LayoutProps = {
  floats?: React.ReactNode;
  type?: 'row' | 'column';
  children: React.ReactNode;
};

type Layout = React.FC<LayoutProps> & {
  ROW: 'row';
  COLUMN: 'column';
};

export {
  LayoutType,
  Layout,
  LayoutProps,
  Container,
  ContainerProps,
  ContainerRenderPropParam,
  Dimensions,
};
