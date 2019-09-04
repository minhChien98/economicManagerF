/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/**
 *
 * CollaboratorPage
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
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Add, Edit, Delete } from '@material-ui/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCollaboratorPage from './selectors';
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

export function CollaboratorPage(props) {
  useInjectReducer({ key: 'collaboratorPage', reducer });
  useInjectSaga({ key: 'collaboratorPage', saga });
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [data, setData] = useState([]);
  const [itemSelected, setItemSelected] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const submitBtn = createRef();

  function openDialogAdd(params, item) {
    if (params === 'edit') {
      setItemSelected(item);
    } else {
      setName('');
      setPhone('');
      setAddress('');
      setNote('');
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
    const body = {
      name,
      phone,
      address,
      note,
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
      setAddress(itemSelected.address);
      setNote(itemSelected.note);
    }
  }, [itemSelected]);

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (props.collaboratorPage.successCreate === true) {
      setOpenAdd(false);
      setOpenDelete(false);
      setItemSelected(null);
      props.onResetNoti();
    }
  }, [props.collaboratorPage.successCreate]);

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (
      props.collaboratorPage.recordList &&
      props.collaboratorPage.recordList.length > 0
    ) {
      setData(props.collaboratorPage.recordList);
      setTotalCount(props.collaboratorPage.count);
    }
  }, [props.collaboratorPage.recordList]);

  const { classes } = props;

  return (
    <div>
      <Helmet>
        <title>Cộng tác viên</title>
        <meta name="description" content="Description of CollaboratorPage" />
      </Helmet>
      <Grid item md={12} sm={12} container>
        <Paper style={{ padding: '20px', width: '100%' }}>
          <Grid item md={12} sm={12} container>
            <Grid item md={2} sm={2}>
              <Typography variant="h6">Danh sách đơn hàng</Typography>
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
                  <TableCell>Tên cộng tác viên</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Địa chỉ</TableCell>
                  <TableCell>Ghi chú</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length > 0
                  ? data.map(item => (
                    <TableRow key={item._id} className={classes.tbRow}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>{item.note}</TableCell>
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
                  label="Tên đơn hàng"
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
              <Grid item md={12}>
                <TextField
                  label="Địa chỉ"
                  style={{ width: '100%' }}
                  variant="outlined"
                  name="address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  label="Ghi chú"
                  multiline
                  rows={3}
                  style={{ width: '100%' }}
                  variant="outlined"
                  name="note"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  margin="normal"
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

CollaboratorPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  collaboratorPage: makeSelectCollaboratorPage(),
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

export default compose(
  withStyles(styles),
  withConnect,
)(CollaboratorPage);
