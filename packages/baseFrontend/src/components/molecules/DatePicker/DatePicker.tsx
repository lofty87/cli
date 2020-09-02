import React from 'react';
import MomentUtils from '@date-io/moment';
import { DatePicker as MuiDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { Props } from './DatePicker.props';

import { NCFC, SCP } from '$types/index';

/**
 * * 스타일링
 * * calendar : 동작 특성상 외부에 스타일링
 * * TextField: styled-components
 */

const DatePicker: NCFC<SCP & Props> = ({
  className,
  textAlign = 'left',
  autoOk = true,
  disableToolbar = true,
  format = 'YYYY-MM-DD',
  inputVariant = 'outlined',
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
      variant={variant}
      {...others}
    />
  </MuiPickersUtilsProvider>
);

export default DatePicker;
