import hex2rgba from 'hex2rgba';
import { css } from '@styles/styled-components';
import { colorOf } from '@styles/lib';

const datePickerStyle = css`
  .MuiPickersStaticWrapper-staticWrapperRoot {
    display: inline-block;
    border: 1px solid ${colorOf(({ others }) => others.background.gray)};
    border-radius: 4px;
  }

  .MuiPickersToolbar-toolbar {
    background-color: ${colorOf(({ main }) => main.thick7)};
  }

  .MuiPickersToolbarText-toolbarTxt {
    color: ${colorOf(({ white }) => white)};
  }

  .MuiPickersCalendarHeader-switchHeader {
    color: ${colorOf(({ dark }) => dark.thick8)};
    background-color: ${colorOf(({ white }) => white)};
  }

  .MuiPickersDay-day {
    color: ${colorOf(({ dark }) => dark.thick7)};

    &:hover {
      background-color: ${(props) => hex2rgba(props.theme.colors.main.thick7, 0.2)};
    }
  }

  .MuiPickersDay-current {
    color: ${colorOf(({ main }) => main.thick9)};
  }

  .MuiPickersDay-daySelected {
    color: ${colorOf(({ white }) => white)};
    background-color: ${colorOf(({ main }) => main.thick7)};

    &:hover {
      background-color: ${colorOf(({ main }) => main.thick8)};
    }
  }

  .MuiPickersDay-dayDisabled {
    color: ${colorOf(({ dark }) => dark.thick5)};
  }

  /* Sun, Sat color */
  .MuiPickersCalendarHeader-daysHeader {
    span:first-child {
      color: ${colorOf(({ red }) => red.thick9)};
    }

    span:last-child {
      color: ${colorOf(({ blue }) => blue.thick9)};
    }
  }

  .MuiPickersCalendar-week {
    div:first-child .MuiPickersDay-day {
      color: ${colorOf(({ red }) => red.thick9)};
    }

    div:last-child .MuiPickersDay-day {
      color: ${colorOf(({ blue }) => blue.thick9)};
    }
  }
`;

export default datePickerStyle;
