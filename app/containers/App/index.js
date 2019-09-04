/* eslint-disable react/prop-types */
/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch } from 'react-router-dom';

import DashboardPage from 'containers/DashboardPage/Loadable';
import SellPage from 'containers/SellPage/Loadable';
import ImportPage from 'containers/ImportPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import CollaboratorPage from 'containers/CollaboratorPage/Loadable';
import EmployeePage from 'containers/EmployeePage/Loadable';
import ExpensesPage from 'containers/ExpensesPage/Loadable';
import TimekeepingPage from 'containers/TimekeepingPage/Loadable';
import Dashboard from 'containers/Dashboard';
import PrivateRoute from '../../components/PrivateRoute';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: 'flex';
  min-height: 100%;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Quản lí tài chính"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Switch>
        <PrivateRoute
          exact
          path="/sell"
          layout={Dashboard}
          component={SellPage}
        />
        <PrivateRoute
          exact
          path="/import"
          layout={Dashboard}
          component={ImportPage}
        />
        <PrivateRoute
          exact
          path="/collaborator"
          layout={Dashboard}
          component={CollaboratorPage}
        />
        <PrivateRoute
          exact
          path="/employee"
          layout={Dashboard}
          component={EmployeePage}
        />
        <PrivateRoute
          exact
          path="/timeKeeping"
          layout={Dashboard}
          component={TimekeepingPage}
        />
        <PrivateRoute
          exact
          path="/expenses"
          layout={Dashboard}
          component={ExpensesPage}
        />
        <PrivateRoute
          exact
          path="/"
          layout={Dashboard}
          component={DashboardPage}
        />
        <PrivateRoute path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
