import { styled } from '@styles/styled-components';
import { DialogProps } from '@material-ui/core/Dialog';
import { breakpoints, colorOf, fontOf, spacingOf } from '@styles/lib';

import ModalAlert from './ModalAlert';

const classes: DialogProps['classes'] = {
  root: 'modal-alert',
  paper: 'modal-alert__paper',
};

const StyledModalAlert = styled(ModalAlert).attrs((props) => ({
  classes,
}))`
  &.modal-alert {
    &--inform .modal-alert__paper > .title {
      background-color: ${colorOf(({ main }) => main.thick7)};
    }

    &--warn .modal-alert__paper > .title {
      background-color: ${colorOf(({ yellow }) => yellow.thick7)};
    }

    &--error .modal-alert__paper > .title {
      background-color: ${colorOf(({ red }) => red.thick7)};
    }

    .modal-alert__paper {
      width: 100%;
      max-width: 320px;

      ${breakpoints.down('sm')} {
        max-width: 280px;
      }

      & > .title {
        margin: 0;
        padding: ${spacingOf(1.5, 2)};
        font-size: ${fontOf(({ subtitle1 }) => subtitle1.size)}rem;
        font-weight: ${fontOf(({ weight }) => weight.bold)};
        color: ${colorOf(({ white }) => white)};
      }

      & > .content {
        padding: ${spacingOf(3.5, 4)};

        & > .content {
          &__message {
            margin-bottom: ${spacingOf(3)}px;
            font-size: ${fontOf(({ body1 }) => body1.size)}rem;
            font-weight: ${fontOf(({ weight }) => weight.regular)};
            line-height: ${fontOf(({ body1 }) => body1.lineHeight)};
            color: ${colorOf(({ dark }) => dark.thick7)};
          }

          &__close-btn {
            text-align: center;
          }
        }
      }
    }
  }
`;

export default StyledModalAlert;
