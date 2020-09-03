import { styled } from '@styles/styled-components';

import DatePicker from './DatePicker';

const StyledDatePicker = styled(DatePicker).attrs((props) => ({
  textAlign: props.textAlign || 'left',
}))`
  .tf__input-element {
    text-align: ${(props) => props.textAlign} !important;
  }

  .tf__input,
  .tf__input-element,
  .MuiInputAdornment-root {
    cursor: pointer !important;
  }
`;

export default StyledDatePicker;
