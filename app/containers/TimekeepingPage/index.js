/**
 *
 * TimekeepingPage
 *
 */

import React, { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import {
  withStyles,
  Grid,
  Paper,
  Typography,
  Fab,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
  TablePagination,
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, Month, Inject } from '@syncfusion/ej2-react-schedule';
import AsyncSelect from 'react-select/async';
import { components } from 'react-select';
import { Add } from '@material-ui/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTimekeepingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles';
// import messages from './messages';
import { serialize } from '../../utils/common';
import { API_EMPLOYEE } from '../../utils/urlConfig';
import { createNewItemAct, resetNoti, getAllItemAct, updateItemAct, deleteItemAct } from './actions';
import { changeSnackbar } from '../Dashboard/actions';

const date = moment().format("YYYY-MM-DD");

export function TimekeepingPage(props) {
  useInjectReducer({ key: 'timekeepingPage', reducer });
  useInjectSaga({ key: 'timekeepingPage', saga });
  const [employee, setEmployee] = useState(null);
  const [amount, setAmount] = useState(0);
  const [itemSelected, setItemSelected] = useState(null);
  const [idSelected, setIdSelected] = useState('');
  const [data, setData] = useState([]);
  const [createdDate, setCreatedDate] = useState(date);
  const [openAdd, setOpenAdd] = useState(false);
  const submitBtn = createRef();
  const scheduleObj = createRef();

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    props.onResetNoti();
    props.onGetAllItem({ params: '' });
  }, []);

  useEffect(() => {
    if (itemSelected !== null) {
      const x = itemSelected.list.find(n => String(n._id) === String(idSelected));
      if (x) {
        const a = {
          employeeId: x.employeeId,
          name: x.name,
        };
        setEmployee(a);
        setAmount(x.amount);
        setCreatedDate(moment(itemSelected.createdDate).format('YYYY-MM-DD'));
      }
    }
  }, [itemSelected]);

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (props.timekeepingPage.recordList && props.timekeepingPage.recordList.length > 0) {
      const list = [];
      props.timekeepingPage.recordList.forEach(element => {
        if (element.list && element.list.length > 0) {
          element.list.forEach(item => {
            list.push({
              Id: item._id,
              CategoryColor: '#2196f3',
              Subject: `${item.name} làm ${item.amount} giờ`,
              StartTime: element.createdDate,
              EndTime: element.createdDate,
              element: element,
            })
          });
        }
      });
      setData(list);
    }
  }, [props.timekeepingPage.recordList]);

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (props.timekeepingPage.successCreate === true) {
      setOpenAdd(false);
      props.onResetNoti();
    }
  }, [props.timekeepingPage.successCreate]);
  return (
    <div>
      <Helmet>
        <title>Chấm công</title>
        <meta name="description" content="Description of TimekeepingPage" />
      </Helmet>
      <Grid item md={12} sm={12} container>
        <Paper style={{ padding: '20px', width: '100%' }}>
          <Grid item md={12} sm={12} container>
            <Grid item md={2} sm={2}>
              <Typography variant="h6">Bảng công</Typography>
            </Grid>
            <Grid item md={3} sm={3}>
              <Fab
                color="primary"
                size="small"
                aria-label="add"
                onClick={() => openDialogAdd('add')}
              >
                <Add />
              </Fab>
            </Grid>
            <Grid item md={12} style={{ marginTop: '10px' }}>
              <ScheduleComponent
                width="100%"
                height="650px"
                popupOpen={onPopupOpen}
                selectedDate={date}
                // ref={t => (scheduleObj = t)}
                eventSettings={{ dataSource: data }}
                eventRendered={onEventRendered}
              >
                <ViewsDirective>
                  <ViewDirective option="Day" displayName="Ngày" />
                  <ViewDirective option="Week" displayName="Tuần" />
                  <ViewDirective option="Month" displayName="Tháng" />
                </ViewsDirective>
                <Inject services={[Day, Week, Month]} />
              </ScheduleComponent>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Dialog
        open={openAdd}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="md"
        onClose={closeDialogAdd}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {'Cập nhật đơn nhập hàng?'}
        </DialogTitle>
        <DialogContent>
          <ValidatorForm
            style={{ width: '100%', display: 'inline' }}
            onSubmit={handleSubmitForm}
          >
            <Grid container item md={12} spacing={2}>
              <Grid item md={12}>
                <AsyncSelect
                  className={props.classes.reactSelect}
                  placeholder="Tìm kiếm nhân viên ..."
                  loadOptions={(newValue, callback) =>
                    loadOptions(newValue, callback, API_EMPLOYEE)
                  }
                  loadingMessage={() => 'Đang tải ...'}
                  components={{ Option, SingleValue }}
                  onChange={handleCollaborator}
                  // defaultOptions={this.state.supplierList}
                  value={employee}
                  theme={theme => ({
                    ...theme,
                    spacing: {
                      ...theme.spacing,
                      controlHeight: '55px',
                    },
                  })}
                />
              </Grid>
              <Grid item md={6}>
                <TextValidator
                  label="Ngày"
                  style={{ width: '100%' }}
                  variant="outlined"
                  name="createdDate"
                  type="date"
                  value={createdDate}
                  onChange={e => setCreatedDate(e.target.value)}
                  margin="normal"
                  validators={['trim', 'required']}
                  errorMessages={[
                    'Không được để trống trường này',
                    'Không được để trống trường này',
                  ]}
                />
              </Grid>
              <Grid item md={6}>
                <TextValidator
                  label="Số giờ"
                  style={{ width: '100%' }}
                  variant="outlined"
                  name="amount"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  margin="normal"
                  validators={['minNumber:0', 'required', 'maxNumber: 24']}
                  errorMessages={[
                    'Số tiền không được nhỏ hơn 0',
                    'Không được để trống trường này',
                    'Không được lớn hơn 24',
                  ]}
                />
              </Grid>
            </Grid>
            <div style={{ display: 'none' }}>
              <button ref={submitBtn} type="submit" />
            </div>
          </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogAdd} color="secondary">
            Đóng
          </Button>
          {itemSelected !== null ? (
            <Button
              onClick={() => props.onDeleteItem({ id: itemSelected._id })}
              color="secondary"
            >
              Xóa
            </Button>
          ) : null}
          <Button
            onClick={() => {
              submitBtn.current.click();
            }}
            color="primary"
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
      {/* <FormattedMessage {...messages.header} /> */}
    </div>
  );

  function onPopupOpen(args) {
    if (args.type !== 'EventContainer') {
      args.cancel = true;
      if (args.data.element) {
        setIdSelected(args.data.Id);
        openDialogAdd('edit', args.data.element);
      }
    }
  }

  function onEventRendered(args) {
    const categoryColor = args.data.CategoryColor;
    if (!args.element || !categoryColor) {
      return;
    }
    if (scheduleObj.currentView === 'Agenda') {
      args.element.firstChild.style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

  function handleSubmitForm() {
    if (employee === null) {
      props.changeSnackbar({
          status: true,
          message: 'Bạn chưa chọn nhân viên',
          variant: 'error',
        });
      return;
    }
    const record = {
      employeeId: employee.employeeId,
      name: employee.name,
      amount: amount,
    };
    const body = {
      createdDate,
      record,
      params: '',
    };
    if (itemSelected !== null) {
      body.id = itemSelected._id;
      props.onUpdateItem(body);
    } else {
      props.onCreateRecord(body);
    }
  }

  function loadOptions(newValue, callback, api) {
    const url = `${api}?filter%5Btype%5D=1&filter%5Bname%5D%5B%24regex%5D=${newValue}`;
    return fetch(url, {
      headers: {},
    })
      .then(response => response.json())
      .then(myJson => {
        const { data } = myJson;
        callback(
          data.map(item => ({
            ...item,
            // eslint-disable-next-line no-underscore-dangle
            value: item._id,
          })),
        );
      });
  }

  function handleCollaborator(colla) {
    const choose = {
      // eslint-disable-next-line no-underscore-dangle
      employeeId: colla._id,
      name: colla.name,
    };
    setEmployee(choose);
  }

  function openDialogAdd(params, item) {
    if (params === 'edit') {
      setItemSelected(item);
    } else {
      setEmployee(null);
      setAmount(0);
      setCreatedDate(date);
    }
    setOpenAdd(true);
  }
  
  function closeDialogAdd() {
    setOpenAdd(false);
    setItemSelected(null);
  }
}

const Option = props => (
  <components.Option {...props}>
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      {/* <Avatar src={props.data.avatar} /> */}
      <div style={{ marginTop: 10 }}>{props.data.name}</div>
    </div>
  </components.Option>
);

const SingleValue = ({ ...props }) => (
  <components.SingleValue {...props}>
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      {/* <Avatar style={{ height: 30, width: 30 }} src={props.data.avatar} /> */}
      <div style={{ marginTop: 5 }}>{props.data.name}</div>
    </div>
  </components.SingleValue>
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

TimekeepingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  timekeepingPage: makeSelectTimekeepingPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onCreateRecord: body => {
      dispatch(createNewItemAct(body));
    },
    onResetNoti: () => {
      dispatch(resetNoti());
    },
    onGetAllItem: body => {
      dispatch(getAllItemAct(body));
    },
    onChangeSnackbar: body => {
      dispatch(changeSnackbar(body));
    },
    onUpdateItem: body => {
      dispatch(updateItemAct(body));
    },
    onDeleteItem: body => {
      dispatch(deleteItemAct(body));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withStyles(styles),withConnect)(TimekeepingPage);
