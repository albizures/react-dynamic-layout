import React from 'react';
import { useFloatContext } from './FloatContext';

interface PropTypes {
  closeLabel?: string;
  onClose: () => void;
}

const Dragbar: React.FC<PropTypes> = (props) => {
  const { onMouseDown } = useFloatContext();
  const { closeLabel, onClose } = props;

  return (
    <div className="rdl-float__drag-bar" onMouseDown={onMouseDown}>
      <button
        onClick={onClose}
        aria-label={closeLabel}
        className="rdl-float__close"
      >
        <svg
          viewBox="0 0 10 10"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="10" x2="10" y2="0" stroke="black" strokeWidth="2" />
          <line x1="0" y1="0" x2="10" y2="10" stroke="black" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
};

export default Dragbar;
