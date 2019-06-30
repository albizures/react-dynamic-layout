declare module 'react-dynamic-layout' {
  export type ContainerProps = {
    id?: string;
    initialSize?: string | number;
    children: () => React.ReactNode | React.ReactNode;
  };
  export const Container: React.SFC<ContainerProps>;
}
