import PropTypes from 'prop-types';

const Container = () => {
  throw new Error(
    'Container is just a placeholder and it`s not intended to be rendered',
  );
};

Container.defaultProps = {
  isFixedSize: false,
};

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  initialSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isFixedSize: PropTypes.bool,
};

export default Container;
