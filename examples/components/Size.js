import React from 'react';

import Label from './Label';
import { register } from '../../src';


function Size(props) {
  return <Label text={props.rdWidth + 'x' + props.rdHeight}/>;
}

Size.displayName = 'Size';

export default Size;

register(Size, 'Size');
