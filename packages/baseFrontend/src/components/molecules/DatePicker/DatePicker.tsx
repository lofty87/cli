import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { InputAdornment } from '@material-ui/core';
import { DatePicker as MuiDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { TextField } from '@components/atoms';

import { Props } from './DatePicker.props';

import { NCFC, SCP } from '$types/index';

/**
 * * 스타일링
 * * calendar : 동작 특성상 외부에 스타일링
 * * TextField: TextField(atom) 를 기반으로 endAdornment, textAlign 추가
 */

const CustomTextField: NCFC<any> = ({
  variant = 'outlined',
  InputProps,
  ...others
}) => (
  <TextField
    variant={variant}
    InputProps={{
      ...InputProps,
      endAdornment: (
        <InputAdornment
          position="end"
        >
          <FaCalendarAlt />
        </InputAdornment>
      ),
    }}
    {...others}
  />
);

const DatePicker: NCFC<SCP & Props> = ({
  className,
  textAlign = 'left',
  autoOk = true,
  disableToolbar = true,
  format = 'YYYY-MM-DD',
  inputVariant = 'outlined',
  TextFieldComponent = CustomTextField,
  variant = 'inline',
  ...others
}) => (
  <MuiPickersUtilsProvider
    locale="ko"
    utils={MomentUtils}
  >
    <MuiDatePicker
      className={className}
      autoOk={autoOk}
      disableToolbar={disableToolbar}
      format={format}
      inputVariant={inputVariant}
      TextFieldComponent={TextFieldComponent}
      variant={variant}
      {...others}
    />
  </MuiPickersUtilsProvider>
);

export default DatePicker;
