import React, { useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useContextLayout from '../hooks/useContextLayout';
import useMouseDiff from '../hooks/useMouseDiff';

const Divider = (props) => {
  const elementRef = useRef();
  const [diff, setDiff] = useState(undefined);
  const { before, after, containersEvents } = props;
  const { type: typeLayout } = useContextLayout();
  const className = classNames('rdl-divider', `rdl-divider--${typeLayout}`);
  const isRow = typeLayout === 'row';
  const style = {
    [isRow ? 'left' : 'top']: diff,
  };

  const onDiffChange = useCallback(
    (newDiff) => {
      const { left, top } = newDiff;
      const currentDiff = isRow ? left : top;

      setDiff(currentDiff);
    },
    [isRow],
  );

  const onDiffLastChange = useCallback(
    (newDiff) => {
      const { left, top } = newDiff;
      const currentDiff = isRow ? left : top;

      containersEvents.fire(`resize.${before}`, {
        diff: currentDiff,
      });
      containersEvents.fire(`resize.${after}`, {
        diff: -currentDiff,
      });
      setDiff(undefined);
    },
    [before, after, isRow, containersEvents],
  );

  const onMouseDown = useMouseDiff({
    onDiffChange,
    onDiffLastChange,
  });

  const classNameContent = classNames({
    'rdl-divider__content': true,
    'rdl-divider__content--active': diff,
  });

  return (
    <div className={className}>
      <div
        style={style}
        className={classNameContent}
        ref={elementRef}
        onMouseDown={onMouseDown}
      />
    </div>
  );
};

Divider.propTypes = {
  before: PropTypes.string.isRequired,
  after: PropTypes.string.isRequired,
  containersEvents: PropTypes.object.isRequired,
};

export default Divider;
