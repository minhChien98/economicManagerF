/* eslint-disable react/prop-types */
/**
 *
 * DashboardPage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import { Typography, Grid, Paper } from '@material-ui/core';
import { Group, ShoppingCart, AddShoppingCart, Person } from '@material-ui/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import Am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import makeSelectDashboardPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getReportAct } from './actions';
import { serialize } from '../../utils/common';
// import messages from './messages';

am4core.useTheme(Am4themesAnimated);
const endDay = moment().format();
const startDay = moment(endDay).startOf('month').format();

export function DashboardPage(props) {
  useInjectReducer({ key: 'dashboardPage', reducer });
  useInjectSaga({ key: 'dashboardPage', saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    const params = {
      filter: {
        createdDate: {
          $gte: startDay,
          $lt: endDay,
        },
      },
    };
    props.onGetAll({ params: serialize(params) });
  }, []);

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (props.dashboardPage.reportList && props.dashboardPage.reportList.length > 0) {
      const chart = am4core.create('chartdiv', am4charts.XYChart);
      let list = [];
      if (props.dashboardPage.reportList.length > 12) {
        list = props.dashboardPage.reportList.slice(0, 12);
      } else {
        list = props.dashboardPage.reportList;
      }
      const data = list.map(item => ({
        month: moment(item.createdDate).format('YYYY-MM'),
        import: item.totalImportStock || 0,
        expenses: item.totalExpenses || 0,
        salary: item.totalSalary || 0,
        sell: item.totalSell || 0,
      }));

      chart.data = data;
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'month';
      categoryAxis.title.text = "Tháng";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.cellStartLocation = 0.1;
      categoryAxis.renderer.cellEndLocation = 0.9;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.title.text = "Số tiền (đồng)";

      createSeries("import", "Nhập hàng", false, chart);
      createSeries("expenses", "Thu chi", true, chart);
      createSeries("salary", "Chi lương", true, chart);
      createSeries("sell", "Bán hàng", false, chart);
      chart.legend = new am4charts.Legend();
    }
  }, [props.dashboardPage.reportList]);

  function createSeries(field, name, stacked, chart) {
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = field;
    series.dataFields.categoryX = "month";
    series.name = name;
    series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
    series.stacked = stacked;
    series.columns.template.width = am4core.percent(95);
  }

  return (
    <div>
      <Helmet>
        <title>Trang chủ</title>
        <meta name="description" content="Description of DashboardPage" />
      </Helmet>
      <Grid item container md={12}>
        <Paper style={{ width: '100%', padding: '20px' }}>
          <Grid item md={12}>
            <Grid style={{ display: 'flex', justifyContent: 'space-between' }} container>
              <ReportBox
                icon={<ShoppingCart style={{ fontSize: 50 }} />}
                number={props.dashboardPage.countSellRecord || 0}
                text="Đơn bán hàng trong tháng"
                color="linear-gradient(to right, #03A9F4, #03a9f4ad)"
              />
              <ReportBox
                icon={<AddShoppingCart style={{ fontSize: 50 }} />}
                number={props.dashboardPage.countImportStock || 0}
                text="Đơn nhập hàng trong tháng"
                color="linear-gradient(to right, rgb(76, 175, 80), rgba(76, 175, 80, 0.68))"
              />
              <ReportBox
                icon={<Group style={{ fontSize: 50 }} />}
                number={props.dashboardPage.countCollaborator || 0}
                text="Cộng tác viên"
                color="linear-gradient(to right, #FFC107, rgba(255, 193, 7, 0.79))"
              />
              <ReportBox
                icon={<Person style={{ fontSize: 50 }} />}
                number={props.dashboardPage.countEmployee || 0}
                text="Nhân viên"
                color="linear-gradient(to right, #FF5722, rgba(255, 87, 34, 0.79))"
              />
            </Grid>
          </Grid>
          <Grid item md={12} container style={{ marginTop: '20px' }}>
            <Grid item md={6} style={{ height: '800px' }}>
              <div id="chartdiv"></div>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {/* <FormattedMessage {...messages.header} /> */}
    </div>
  );
}

const ReportBox = props => (
  <div item md={3} spacing={4} style={{ background: props.color, borderRadius: '3px', padding: '25px 10px', width: '23%', position: 'relative' }}>
    <div style={{ padding: 5, zIndex: 999 }}>
      <Typography style={{ color: 'white' }} variant="h4">
        {props.number}
      </Typography>
      <Typography variant="body1">{props.text}</Typography>
    </div>
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.2,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 88,
        fontSize: '70px',
        padding: 5,
      }}
    >
      {props.icon}
    </div>
  </div>
);

DashboardPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboardPage: makeSelectDashboardPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onGetAll: body => {
      dispatch(getReportAct(body));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DashboardPage);
