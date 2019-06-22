import PropTypes from 'prop-types';

const Item = () => {
  throw new Error(
    'React Dynamic Layour: The `Item` component is not meant to be rendered! ' +
      "It's an abstract component that is only valid as a direct Child of the `Tabs` Component. ",
  );
};

Item.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Item;
