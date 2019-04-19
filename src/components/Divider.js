import React, { useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { layoutTypes } from '../utils/enums';
import useContextLayout from '../hooks/useContextLayout';
import useMouseDiff from '../hooks/useMouseDiff';

const Divider = (props) => {
  const elementRef = useRef();
  const [diff, setDiff] = useState(undefined);
  const { before, after, onSizeChange } = props;
  const { type: typeLayout } = useContextLayout();
  const className = classNames('rdl-divider', `rdl-divider--${typeLayout}`);
  const isRow = typeLayout === layoutTypes.ROW;
  const style = {
    [isRow ? 'left' : 'top']: diff,
  };

  const onDiffChange = useCallback(
    (diff) => {
      const { left, top } = diff;
      const currentDiff = isRow ? left : top;

      setDiff(currentDiff);
    },
    [isRow],
  );

  const onDiffLastChange = useCallback(
    (diff) => {
      const { left, top } = diff;
      const currentDiff = isRow ? left : top;

      onSizeChange({ before, after, diff: currentDiff });
      setDiff(undefined);
    },
    [before, after, onSizeChange, isRow],
  );

  const onMouseDown = useMouseDiff({
    onDiffChange,
    onDiffLastChange,
  });

  return (
    <div className={className}>
      <div
        style={style}
        className="rdl-divider__content"
        ref={elementRef}
        onMouseDown={onMouseDown}
      />
    </div>
  );
};

Divider.propTypes = {
  onSizeChange: PropTypes.func.isRequired,
  before: PropTypes.string.isRequired,
  after: PropTypes.string.isRequired,
};

export default Divider;
