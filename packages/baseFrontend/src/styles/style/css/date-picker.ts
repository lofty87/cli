import { css } from '@styles/styled-components';
import { colorOf } from '@styles/lib';

export const datePicker = css`
  .MuiPickersDay-day {
    &.MuiPickersDay-current {
      color: ${colorOf(({ main }) => main.thick7)};
    }

    &.MuiPickersDay-daySelected {
      color: ${colorOf(({ white }) => white)};
      background-color: ${colorOf(({ main }) => main.thick7)};
    }
  }
`;
