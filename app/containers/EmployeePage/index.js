/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/**
 *
 * EmployeePage
 *
 */

import React, { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

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
  TextField,
  MenuItem,
} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Add, Edit, Delete } from '@material-ui/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectEmployeePage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import styles from './styles';
import {
  createNewItemAct,
  resetNoti,
  getAllItemAct,
  updateItemAct,
  deleteItemAct,
} from './actions';
import { changeSnackbar } from '../Dashboard/actions';

function formatNumber(num) {
  if (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  return '';
}

export function EmployeePage(props) {
  useInjectReducer({ key: 'employeePage', reducer });
  useInjectSaga({ key: 'employeePage', saga });
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [data, setData] = useState([]);
  const [itemSelected, setItemSelected] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState(0);
  const [moneyPerMonth, setMoneyPerMonth] = useState(0);
  const [moneyPerHour, setMoneyPerHour] = useState(0);
  const submitBtn = createRef();
  function openDialogAdd(params, item) {
    if (params === 'edit') {
      setItemSelected(item);
    } else {
      setName('');
      setPhone('');
      setType(0);
      setMoneyPerHour(0);
      setMoneyPerMonth(0);
    }
    setOpenAdd(true);
  }

  function handleOpenDelete(item) {
    setOpenDelete(true);
    setItemSelected(item);
  }

  function closeDialogAdd() {
    setOpenAdd(false);
    setOpenDelete(false);
  }

  function handleChangePage(e, newPage) {
    props.onGetAllItem({ skip: newPage * pageSize, limit: pageSize });
    setPage(newPage);
  }

  function handleChangeRowsPerPage(e) {
    props.onGetAllItem({ skip: page * pageSize, limit: e.target.value });
    setPageSize(e.target.value);
  }

  function handleSubmitForm() {
    let month;
    let hour;
    if (type === 0) {
      month = moneyPerMonth;
    } else {
      hour = moneyPerHour;
    }
    const body = {
      name,
      phone,
      type,
      moneyPerMonth: month,
      moneyPerHour: hour,
      limit: pageSize,
      skip: pageSize * page,
    };
    if (itemSelected !== null) {
      body.id = itemSelected._id;
      props.onUpdateItem(body);
    } else {
      props.onCreateRecord(body);
    }
  }

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    props.onResetNoti();
    props.onGetAllItem({ skip: 0, limit: 10 });
  }, []);

  useEffect(() => {
    if (itemSelected !== null) {
      setName(itemSelected.name);
      setPhone(itemSelected.phone);
      setType(itemSelected.type);
      setMoneyPerHour(itemSelected.moneyPerHour);
      setMoneyPerMonth(itemSelected.moneyPerMonth);
    }
  }, [itemSelected]);

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (props.employeePage.successCreate === true) {
      setOpenAdd(false);
      setOpenDelete(false);
      setItemSelected(null);
      props.onResetNoti();
    }
  }, [props.employeePage.successCreate]);

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (
      props.employeePage.recordList &&
      props.employeePage.recordList.length > 0
    ) {
      setData(props.employeePage.recordList);
      setTotalCount(props.employeePage.count);
    }
  }, [props.employeePage.recordList]);

  const { classes } = props;
  return (
    <div>
      <Helmet>
        <title>Nhân sự</title>
        <meta name="description" content="Description of EmployeePage" />
      </Helmet>
      <Grid item md={12} sm={12} container>
        <Paper style={{ padding: '20px', width: '100%' }}>
          <Grid item md={12} sm={12} container>
            <Grid item md={2} sm={2}>
              <Typography variant="h6">Danh sách nhân viên</Typography>
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
          </Grid>
          <Grid item md={12} sm={12} container>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên nhân viên</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Loại nhân viên</TableCell>
                  <TableCell>Tiền lương</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length > 0
                  ? data.map(item => (
                    <TableRow key={item._id} className={classes.tbRow}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>{item.type === 0 ? 'Fulltime' : `Partime`}</TableCell>
                      <TableCell>{item.type === 0 ? formatNumber(item.moneyPerMonth) : `${formatNumber(item.moneyPerHour)}/h`}</TableCell>
                      <TableCell>
                        <Fab
                          color="primary"
                          size="small"
                          aria-label="Sửa"
                          onClick={() => openDialogAdd('edit', item)}
                        >
                          <Edit />
                        </Fab>
                        &nbsp;
                        <Fab
                          color="secondary"
                          size="small"
                          aria-label="Xóa"
                          onClick={() => handleOpenDelete(item)}
                        >
                          <Delete />
                        </Fab>
                      </TableCell>
                    </TableRow>
                  )) : null}
              </TableBody>
            </Table>
            <Grid item md={8} />
            <Grid item md={4}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={totalCount}
                style={{ float: 'right' }}
                rowsPerPage={pageSize}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'Trang trước',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Trang sau',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Dialog
        open={openAdd}
        TransitionComponent={Transition}
        keepMounted
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
              <Grid item md={6}>
                <TextValidator
                  label="Tên nhân viên"
                  style={{ width: '100%' }}
                  variant="outlined"
                  name="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
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
                  label="Số điện thoại"
                  style={{ width: '100%' }}
                  variant="outlined"
                  name="phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  margin="normal"
                  validators={['trim', 'required']}
                  errorMessages={[
                    'Không được để trống trường này',
                    'Không được để trống trường này',
                  ]}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  label="Loại nhân viên"
                  style={{ width: '100%' }}
                  variant="outlined"
                  name="type"
                  select
                  value={type}
                  onChange={e => setType(e.target.value)}
                  margin="normal"
                >
                  <MenuItem value={0}>Nhân viên fulltime</MenuItem>
                  <MenuItem value={1}>Nhân viên partime</MenuItem>
                </TextField>
              </Grid>
              {type === 0 ? (
                <Grid item md={6}>
                  <TextValidator
                    label="Lương theo tháng"
                    style={{ width: '100%' }}
                    variant="outlined"
                    name="moneyPerMonth"
                    value={moneyPerMonth}
                    onChange={e => setMoneyPerMonth(e.target.value)}
                    margin="normal"
                    validators={['minNumber: 0', 'trim', 'required']}
                    errorMessages={[
                      'Không được nhỏ hơn 0',
                      'Không được để trống trường này',
                      'Không được để trống trường này',
                    ]}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                </Grid>
              ): (
                <Grid item md={6}>
                  <TextValidator
                    label="Lương theo giờ"
                    style={{ width: '100%' }}
                    variant="outlined"
                    name="moneyPerHour"
                    value={moneyPerHour}
                    onChange={e => setMoneyPerHour(e.target.value)}
                    margin="normal"
                    validators={['minNumber: 0', 'trim', 'required']}
                    errorMessages={[
                      'Không được nhỏ hơn 0',
                      'Không được để trống trường này',
                      'Không được để trống trường này',
                    ]}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                </Grid>
              )}
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
      <Dialog
        open={openDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDialogAdd}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {'Bạn có chắc chắn muốn xóa?'}
        </DialogTitle>
        <DialogContent />
        <DialogActions>
          <Button onClick={closeDialogAdd} color="secondary">
            Đóng
          </Button>
          <Button
            onClick={() => props.onDeleteItem({ id: itemSelected._id })}
            color="primary"
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
      {/* <FormattedMessage {...messages.header} /> */}
    </div>
  );
}

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
    />
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

EmployeePage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  employeePage: makeSelectEmployeePage(),
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

export default compose(withStyles(styles),withConnect)(EmployeePage);
