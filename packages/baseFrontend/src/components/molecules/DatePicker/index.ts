import { styled } from '@styles/styled-components';

import DatePicker from './DatePicker';

const StyledDatePicker = styled(DatePicker).attrs((props) => ({
  textAlign: props.textAlign || 'left',
}))`
  .tf {
    text-align: ${(props) => props.textAlign};
  }
`;

export default StyledDatePicker;
