/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/**
 *
 * SellPage
 *
 */

import React, { useState, useEffect } from 'react';
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
} from '@material-ui/core';
import { Add, Edit, Delete, Cancel, DoneAll } from '@material-ui/icons';
import moment from 'moment';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSellPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles';
import DialogAddCollaborator from '../../components/DialogAddCollaborators';
import { createNewItemAct, resetNoti, getAllItemAct, updateItemAct, deleteItemAct } from './actions';
import { changeSnackbar } from '../Dashboard/actions';
// import messages from './messages';

function formatNumber(num) {
  if (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  return '';
}

export function SellPage(props) {
  useInjectReducer({ key: 'sellPage', reducer });
  useInjectSaga({ key: 'sellPage', saga });

  // state
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [status, setStatus] = useState(0);
  const [data, setData] = useState([]);
  const [itemSelected, setItemSelected] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  function openDialogAdd(params, item) {
    if (params === 'edit') {
      setItemSelected(item);
    }
    setOpenAdd(true);
  }

  function handleOpenDelete(item) {
    setOpenDelete(true);
    setItemSelected(item);
  }

  function handleOpenUpdate(item, status) {
    setOpenUpdate(true);
    setItemSelected(item);
    setStatus(status);
  }

  function closeDialogAdd() {
    setOpenAdd(false);
    setOpenDelete(false);
    setOpenUpdate(false);
  }

  function handleChangePage(e, newPage) {
    props.onGetAllItem({ skip: newPage * pageSize, limit: pageSize });
    setPage(newPage);
  }

  function handleChangeRowsPerPage(e) {
    props.onGetAllItem({ skip: page * pageSize, limit: e.target.value });
    setPageSize(e.target.value);
  }

  function updateStatus() {
    const body = itemSelected;
    body.id = itemSelected._id;
    body.sellStatus = status;
    props.onUpdateItem(body);
  }

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    props.onResetNoti();
    props.onGetAllItem({ skip: 0, limit: 10 });
  }, []);

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (props.sellPage.successCreate === true) {
      setOpenAdd(false);
      setOpenDelete(false);
      setItemSelected(null);
      setOpenUpdate(false);
      setStatus(0);
      props.onResetNoti();
    }
  }, [props.sellPage.successCreate]);

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (props.sellPage.recordList && props.sellPage.recordList.length > 0) {
      setData(props.sellPage.recordList);
      setTotalCount(props.sellPage.count);
    }
  }, [props.sellPage.recordList]);

  const { classes } = props;

  return (
    <div>
      <Helmet>
        <title>Bán hàng</title>
        <meta name="description" content="Description of SellPage" />
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
                  <TableCell>Ngày bán</TableCell>
                  <TableCell>Số tiền</TableCell>
                  <TableCell>Ghi chú</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length > 0
                  ? data.map(item => (
                      <TableRow key={item._id} className={classes.tbRow}>
                        <TableCell>{item.collaborator ? item.collaborator.name : 'Khách lẻ'}</TableCell>
                        <TableCell>{moment(item.createdDate).format('YYYY-MM-DD')}</TableCell>
                        <TableCell>{formatNumber(item.amount)}</TableCell>
                        <TableCell>{item.note}</TableCell>
                        <TableCell>{item.sellStatus === 0 ? 'Chờ Ship' : item.sellStatus === 1 ? 'Hoàn thành' : 'Hủy đơn'}</TableCell>
                        {item.sellStatus === 0 ? (
                          <TableCell>
                            <Fab
                              color="primary"
                              size="small"
                              aria-label="Hoàn thành"
                              onClick={() => handleOpenUpdate(item, 1)}
                            >
                              <DoneAll />
                            </Fab>
                            &nbsp;
                            <Fab
                              color="secondary"
                              size="small"
                              aria-label="Hủy đơn"
                              onClick={() => handleOpenUpdate(item, 2)}
                            >
                              <Cancel />
                            </Fab>
                            &nbsp;
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
                        ) : item.collaborator.name === 'Khách lẻ' ? (
                          <TableCell>
                            <Fab
                              color="secondary"
                              size="small"
                              aria-label="Hủy đơn"
                              onClick={() => handleOpenUpdate(item, 2)}
                            >
                              <Cancel />
                            </Fab>
                            &nbsp;
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
                        ) : (
                            <TableCell>
                            <Fab
                              color="secondary"
                              size="small"
                              aria-label="Hủy đơn"
                              onClick={() => handleOpenUpdate(item, 2)}
                            >
                              <Cancel />
                            </Fab>
                            &nbsp;
                            </TableCell>
                        )}
                      </TableRow>
                    ))
                  : null}
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
      <DialogAddCollaborator
        openAdd={openAdd}
        closeDialogAdd={closeDialogAdd}
        classes={props.classes}
        onCreateRecord={props.onCreateRecord}
        itemSelected={itemSelected}
        onChangeSnackbar={props.onChangeSnackbar}
        onUpdateItem={props.onUpdateItem}
        page={page}
        pageSize={pageSize}
      />
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
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogAdd} color="secondary">
            Đóng
          </Button>
          <Button
            onClick={() => props.onDeleteItem({id: itemSelected._id})}
            color="primary"
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openUpdate}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDialogAdd}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {`Bạn có chắc chắn chuyển trạng thái đơn hàng sang ${status === 1 ? 'Hoàn thành' : 'Hủy đơn hàng'}?`}
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogAdd} color="secondary">
            Đóng
          </Button>
          <Button
            onClick={updateStatus}
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

SellPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.any.isRequired,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const mapStateToProps = createStructuredSelector({
  sellPage: makeSelectSellPage(),
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
  withConnect,
  withStyles(styles),
)(SellPage);
