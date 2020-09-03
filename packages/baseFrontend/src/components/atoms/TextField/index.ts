import { textAlign } from '@material-ui/system';
import { TextFieldProps } from '@material-ui/core';
import { styled } from '@styles/styled-components';
import { colorOf, fontOf } from '@styles/lib';

import TextField from './TextField';

const InputLabelProps: TextFieldProps['InputLabelProps'] = {
  classes: {
    root: 'tf__label',
    focused: 'tf__label--focused',
    disabled: 'tf__label--disabled',
    error: 'tf__label--error',
    shrink: 'tf__label--shrink',
  },
};

const InputProps: TextFieldProps['InputProps'] = {
  classes: {
    root: 'tf__input',
    focused: 'tf__input--focused',
    disabled: 'tf__input--disabled',
    error: 'tf__input--error',
    multiline: 'tf__input--multiline',
    notchedOutline: 'notchedOutline',
    input: 'tf__input-element',
  },
};

const StyledTextField = styled(TextField).attrs((props) => ({
  InputLabelProps: {
    ...InputLabelProps,
    ...props.InputLabelProps,
  },
  InputProps: {
    ...InputProps,
    ...props.InputProps,
  },
  textAlign: props.textAlign || 'left',
}))`
  &:hover > .tf__label--shrink {
    &:not(.tf__label--disabled) {
      &:not(.tf__label--error) {
        color: ${colorOf(({ main }) => main.thick7)};
      }
    }
  }

  & > .tf__label--focused {
    &:not(.tf__label--disabled) {
      &:not(.tf__label--error) {
        color: ${colorOf(({ main }) => main.thick7)};
      }
    }
  }

  & > .tf__input:hover,
  & > .tf__input--focused {
    &:not(.tf__input--disabled) {
      &:not(.tf__input--error) {
        & > .MuiInputAdornment-root,
        & > .MuiInputAdornment-root p {
          color: ${colorOf(({ main }) => main.thick7)};
        }

        &:before,
        & > .notchedOutline {
          border-color: ${colorOf(({ main }) => main.thick7)};
        }
      }
    }
  }

  & > .tf__input {
    &:not(.tf__input--disabled) {
      &:not(.tf__input--error) {
        font-size: ${fontOf(({ subtitle1 }) => subtitle1.size)}rem;
        font-weight: ${fontOf(({ weight }) => weight.regular)};
        color: ${colorOf(({ dark }) => dark.thick7)};

        &:after {
          border-bottom-color: ${colorOf(({ main }) => main.thick7)};
        }
      }
    }

    &--multiline {
      line-height: ${fontOf(({ subtitle1 }) => subtitle1.lineHeight)};
    }

    & > .tf__input-element {
      ${textAlign}
    }
  }
`;

export default StyledTextField;
