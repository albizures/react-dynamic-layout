import React from 'react';

// NOTE: only for testing

interface PropTypes {
  text: string;
}

const Label: React.FC<PropTypes> = (props) => {
  return <label>{props.text}</label>;
};

export default Label;
