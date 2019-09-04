/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/**
 *
 * DialogAddCollaborators
 *
 */

import React, { useState, createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
  TextField,
} from '@material-ui/core';
import moment from 'moment';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import AsyncSelect from 'react-select/async';
import { components } from 'react-select';
import NumberFormat from 'react-number-format';
import { API_COLLABORATORS } from '../../utils/urlConfig';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
const date = moment().format('YYYY-MM-DD');

function DialogAddCollaborators(props) {
  const [collaborator, setCollaborator] = useState(null);
  const [money, setMoney] = useState(0);
  const [createdDate, setCreatedDate] = useState(date);
  const [note, setNote] = useState('');
  const submitBtn = createRef();

  useEffect(() => {
    setCollaborator(null);
    setCreatedDate(date);
    setMoney(0);
    setNote('');
  }, [props.openAdd]);

  useEffect(() => {
    if (props.itemSelected !== null) {
      setCollaborator(props.itemSelected.collaborator);
      setCreatedDate(
        moment(props.itemSelected.createdDate).format('YYYY-MM-DD'),
      );
      setMoney(props.itemSelected.amount);
      setNote(props.itemSelected.note);
    }
  }, [props.itemSelected]);

  function loadOptions(newValue, callback, api) {
    const url = `${api}?filter%5Bname%5D%5B%24regex%5D=${newValue}`;
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
      collaboratorId: colla._id,
      name: colla.name,
    };
    setCollaborator(choose);
  }

  function handleSubmitForm() {
    // if (collaborator === null) {
    //   props.onChangeSnackbar({
    //       status: true,
    //       message: 'Bạn chưa chọn cộng tác viên',
    //       variant: 'error',
    //     });
    //   return;
    // }
    const body = {
      createdDate,
      amount: money,
      note,
      collaborator,
      limit: props.pageSize,
      skip: props.pageSize * props.page,
    };
    if (props.itemSelected !== null) {
      body.id = props.itemSelected._id;
      props.onUpdateItem(body);
    } else {
      props.onCreateRecord(body);
    }
  }
  return (
    <Dialog
      open={props.openAdd}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="md"
      keepMounted
      onClose={props.closeDialogAdd}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {'Thêm mới đơn bán hàng'}
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
                placeholder="Tìm kiếm cộng tác viên  ..."
                loadOptions={(newValue, callback) =>
                  loadOptions(newValue, callback, API_COLLABORATORS)
                }
                loadingMessage={() => 'Đang tải ...'}
                components={{ Option, SingleValue }}
                onChange={handleCollaborator}
                // defaultOptions={this.state.supplierList}
                value={collaborator}
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
                label="Số tiền"
                style={{ width: '100%' }}
                variant="outlined"
                name="money"
                value={money}
                onChange={e => setMoney(e.target.value)}
                margin="normal"
                validators={['minNumber:0', 'required']}
                errorMessages={[
                  'Số tiền không được nhỏ hơn 0',
                  'Không được để trống trường này',
                ]}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
            </Grid>
            <Grid item md={6}>
              <TextValidator
                label="Ngày"
                style={{ width: '100%' }}
                variant="outlined"
                type="date"
                name="createdDate"
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
        <Button onClick={props.closeDialogAdd} color="secondary">
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

NumberFormatCustom.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  inputRef: PropTypes.any.isRequired,
  onChange: PropTypes.any.isRequired,
};

Option.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
};

SingleValue.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
};

DialogAddCollaborators.propTypes = {
  openAdd: PropTypes.any.isRequired,
  classes: PropTypes.any.isRequired,
  closeDialogAdd: PropTypes.any.isRequired,
};

export default DialogAddCollaborators;
