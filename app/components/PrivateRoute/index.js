import React from 'react';
import { compose } from 'redux';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

export function PrivateRoute(props) {
  const { component: InnerComponent, layout: Layout, ...rest } = props;
  return (
    <Route
      {...rest}
      render={propsPre => (
        <Layout>
          <InnerComponent {...propsPre} />
        </Layout>
      )}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
  layout: PropTypes.any,
};

export default compose(withRouter)(PrivateRoute);
