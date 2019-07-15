import React from 'react';
import { Dimensions } from '../../hooks/useDimensions';

interface PropTypes {
  children:
    | React.ReactNode
    | ((options: { dimensions: Dimensions }) => React.ReactNode);
  title: string;
  name: string;
  onClick?: Function;
}

type Item = React.FC<PropTypes>;

const Item: React.FC<PropTypes> = () => {
  throw new Error(
    'React Dynamic Layour: The `Item` component is not meant to be rendered! ' +
      "It's an abstract component that is only valid as a direct Child of the `Tabs` Component. ",
  );
};

export default Item;
