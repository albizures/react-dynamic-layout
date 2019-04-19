// @ts-check
import React from 'react';
import PropTypes from 'prop-types';

import { layoutTypes } from '../../utils/enums';
import useContextLayout from '../../hooks/useContextLayout';
import Layout from '../Layout';
import Root from '../Root';

const PlaceHolderLayout = (props) => {
  const { children, floats, type } = props;
  const { isRoot } = useContextLayout();

  const layout = (
    <Layout type={type} floats={floats}>
      {children}
    </Layout>
  );

  if (isRoot) {
    return <Root>{layout}</Root>;
  }

  return layout;
};

PlaceHolderLayout.defaultValues = {
  type: layoutTypes.ROW,
  floats: [],
};

PlaceHolderLayout.propTypes = {
  floats: PropTypes.array,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(Object.values(layoutTypes)),
};

Object.assign(PlaceHolderLayout, layoutTypes);

export default PlaceHolderLayout;
