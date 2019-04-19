import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { resizeBarTypes } from '../utils/enums';
import useMouseDiff from '../hooks/useMouseDiff';

const resizeBarTypesList = Object.values(resizeBarTypes);

const getDiff = (type, diff) => {
  if (!diff) {
    return undefined;
  }

  const { left, top } = diff;

  if (type === resizeBarTypes.NORTH) {
    return {
      top,
    };
  }

  if (type === resizeBarTypes.SOUTH) {
    return {
      bottom: -top,
    };
  }

  if (type === resizeBarTypes.EAST) {
    return {
      right: -left,
    };
  }

  if (type === resizeBarTypes.WEST) {
    return {
      left,
    };
  }

  if (type === resizeBarTypes.SOUTH_EAST) {
    return {
      bottom: -top,
      right: -left,
    };
  }

  if (type === resizeBarTypes.SOUTH_WEST) {
    return {
      bottom: -top,
      left,
    };
  }

  if (type === resizeBarTypes.NORTH_EAST) {
    return {
      top,
      right: -left,
    };
  }

  if (type === resizeBarTypes.NORTH_WEST) {
    return {
      top,
      left,
    };
  }
};

const ResizeBar = (props) => {
  const [diff, setDiff] = useState(undefined);
  const { type, onSizeChange } = props;
  const elementRef = useRef();
  const className = classNames({
    'rdl-resize-bar': true,
    [`rdl-resize-bar--${type}`]: resizeBarTypesList.includes(type),
  });

  const style = getDiff(type, diff);

  const onDiffChange = useCallback((diff) => {
    setDiff(diff);
  }, []);

  const onDiffLastChange = useCallback(
    (diff) => {
      onSizeChange(getDiff(type, diff));
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

ResizeBar.defaultProps = {
  isModal: false,
  closeLabel: 'Close',
};

ResizeBar.propTypes = {
  type: PropTypes.oneOf(Object.values(resizeBarTypes)).isRequired,
  onSizeChange: PropTypes.func.isRequired,
};

export default ResizeBar;
