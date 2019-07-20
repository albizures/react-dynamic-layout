enum LayoutType {
  ROW = 'row',
  COLUMN = 'column',
}
interface Dimensions {
  height: number;
  width: number;
}

interface ContainerRenderPropParam {
  dimensions: Dimensions;
  id: string;
}

interface ContainerProps {
  id?: string;
  isFixedSize?: boolean;
  initialSize?: string | number;
  children:
    | ((param: ContainerRenderPropParam) => React.ReactNode)
    | React.ReactNode;
}

type Container = React.FC<ContainerProps>;

interface LayoutProps {
  floats?: React.ReactNode;
  type?: LayoutType;
  children: React.ReactNode;
}

type Layout = React.FC<LayoutProps> & {
  ROW: LayoutType.ROW;
  COLUMN: LayoutType.COLUMN;
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
