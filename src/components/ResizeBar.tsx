import React, { useRef, useState, useCallback } from 'react';
import classNames from 'classnames';

import { ResizeBarTypes } from '../utils/enums';
import useMouseDiff, { Position } from '../hooks/useMouseDiff';

const ResizeBarTypesList = Object.values(ResizeBarTypes);

const getDiff = (type: ResizeBarTypes, diff: Position | undefined) => {
  if (!diff) {
    return undefined;
  }

  const { left, top } = diff;

  if (type === ResizeBarTypes.NORTH) {
    return {
      top,
    };
  }

  if (type === ResizeBarTypes.SOUTH) {
    return {
      bottom: -top,
    };
  }

  if (type === ResizeBarTypes.EAST) {
    return {
      right: -left,
    };
  }

  if (type === ResizeBarTypes.WEST) {
    return {
      left,
    };
  }

  if (type === ResizeBarTypes.SOUTH_EAST) {
    return {
      bottom: -top,
      right: -left,
    };
  }

  if (type === ResizeBarTypes.SOUTH_WEST) {
    return {
      bottom: -top,
      left,
    };
  }

  if (type === ResizeBarTypes.NORTH_EAST) {
    return {
      top,
      right: -left,
    };
  }

  if (type === ResizeBarTypes.NORTH_WEST) {
    return {
      top,
      left,
    };
  }
};

interface PropType {
  type: ResizeBarTypes;
  onSizeChange: Function;
}

const ResizeBar: React.FC<PropType> = (props) => {
  const [diff, setDiff] = useState<Position>();
  const { type, onSizeChange } = props;
  const elementRef = useRef<HTMLDivElement>(null);
  const className = classNames({
    'rdl-resize-bar': true,
    [`rdl-resize-bar--${type}`]: ResizeBarTypesList.includes(type),
  });

  const style = getDiff(type, diff);

  const onDiffChange = useCallback((newDiff) => {
    setDiff(newDiff);
  }, []);

  const onDiffLastChange = useCallback(
    (newDiff) => {
      onSizeChange(getDiff(type, newDiff));
      setDiff(undefined);
    },
    [onSizeChange, type],
  );

  const onMouseDown = useMouseDiff({
    onDiffChange,
    onDiffLastChange,
  });

  return (
    <div
      style={style}
      ref={elementRef}
      onMouseDown={onMouseDown}
      className={className}
    />
  );
};

export default ResizeBar;
