/* eslint-disable react/prop-types */
/**
 *
 * Dashboard
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {
  CssBaseline,
  withStyles,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { compose } from 'redux';
import { useSnackbar } from 'notistack';
import {
  ShoppingCart,
  Person,
  Group,
  Timer,
  AddShoppingCart,
} from '@material-ui/icons';
import DashboardIcon from '@material-ui/icons/Dashboard';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import styles from './styles';
import { closeSnackbar } from './actions';

export function Dashboard(props) {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (props.dashboard.status) {
      enqueueSnackbar(props.dashboard.message, {
        variant: props.dashboard.variant,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 3000,
      });
      props.onCloseSnackbar();
    }
  }, [props.dashboard.status]);

  const { classes, children } = props;
  return (
    <div>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {/* <div className={classes.toolbar} /> */}
        <List style={{ marginTop: '15px' }}>
          <ListItem
            button
            component={NavLink}
            to="/"
            activeClassName={classes.active}
            className={classes.listItem}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.selected }}
              primary="Dashboard"
            />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/sell"
            activeClassName={classes.active}
            className={classes.listItem}
          >
            <ListItemIcon>
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.selected }}
              primary="Bán hàng"
            />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/import"
            activeClassName={classes.active}
            className={classes.listItem}
          >
            <ListItemIcon>
              <AddShoppingCart />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.selected }}
              primary="Nhập hàng"
            />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/expenses"
            activeClassName={classes.active}
            className={classes.listItem}
          >
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.selected }}
              primary="Thu chi"
            />
          </ListItem> 
          <ListItem
            button
            component={NavLink}
            to="/collaborator"
            activeClassName={classes.active}
            className={classes.listItem}
          >
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.selected }}
              primary="Cộng tác viên"
            />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/employee"
            activeClassName={classes.active}
            className={classes.listItem}
          >
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.selected }}
              primary="Nhân sự"
            />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/timeKeeping"
            activeClassName={classes.active}
            className={classes.listItem}
          >
            <ListItemIcon>
              <Timer />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.selected }}
              primary="Chấm công"
            />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={classes.content}
        style={{ width: `${window.screen.width - 200}px`, marginLeft: '200px' }}
      >
        {/* <div className={classes.toolbar} /> */}
        {children}
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onCloseSnackbar: () => {
      dispatch(closeSnackbar());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(Dashboard);
