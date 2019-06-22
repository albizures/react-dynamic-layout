import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const getRandomColorPart = () => Math.floor(Math.random() * 200);

const getRandomColor = () => {
  const red = getRandomColorPart();
  const green = getRandomColorPart();
  const blue = getRandomColorPart();

  return (transparency) => {
    return `rgba(${red}, ${green}, ${blue}, ${transparency})`;
  };
};

const defaultTransparency = 0.1;

const CenterName = (props) => {
  const color = useMemo(getRandomColor, []);
  const [transparency, setTransparencyTo] = useState(defaultTransparency);
  const { name } = props;
  const style = {
    backgroundColor: color(transparency),
  };

  const onMouseEnter = () => {
    setTransparencyTo(0.3);
  };

  const onMouseLeave = () => {
    setTransparencyTo(defaultTransparency);
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="center-name"
      style={style}
    >
      <h2>{name}</h2>
    </div>
  );
};

CenterName.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CenterName;
