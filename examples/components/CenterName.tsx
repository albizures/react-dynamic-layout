import React, { useState, useMemo } from 'react';

const getRandomColorPart = (): number => Math.floor(Math.random() * 200);

type RandomColorFactory = () => (transparency: number) => string;

const getRandomColor: RandomColorFactory = () => {
  const red = getRandomColorPart();
  const green = getRandomColorPart();
  const blue = getRandomColorPart();

  return (transparency) => {
    return `rgba(${red}, ${green}, ${blue}, ${transparency})`;
  };
};

const defaultTransparency = 0.1;

interface PropTypes {
  name: string;
  small?: boolean;
}

const CenterName: React.FC<PropTypes> = (props) => {
  const color = useMemo(getRandomColor, []);
  const [transparency, setTransparencyTo] = useState(defaultTransparency);
  const { name, small = true } = props;
  const style = {
    backgroundColor: color(transparency),
  };

  const onMouseEnter = (): void => {
    setTransparencyTo(0.3);
  };

  const onMouseLeave = (): void => {
    setTransparencyTo(defaultTransparency);
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="center-name"
      style={style}
    >
      {small ? <h5>{name}</h5> : <h2>{name}</h2>}
    </div>
  );
};

export default CenterName;
