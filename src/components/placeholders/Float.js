import PropTypes from 'prop-types';

const Float = () => {
  throw new Error(
    'Container is just a placeholder and it`s not intended to be rendered',
  );
};

Float.defaultProps = {
  isModal: false,
};

Float.propTypes = {
  isModal: PropTypes.bool,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  top: PropTypes.number,
  left: PropTypes.number,
};
