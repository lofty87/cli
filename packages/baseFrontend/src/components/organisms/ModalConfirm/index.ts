import { styled } from '@styles/styled-components';
import { DialogProps } from '@material-ui/core/Dialog';
import { breakpoints, colorOf, fontOf, spacingOf } from '@styles/lib';

import ModalConfirm from './ModalConfirm';

const classes: DialogProps['classes'] = {
  root: 'modal-confirm',
  paper: 'modal-confirm__paper',
};

const StyledModalConfirm = styled(ModalConfirm).attrs((props) => ({
  classes,
}))`
  &.modal-confirm .modal-confirm__paper {
    width: 100%;
    max-width: 320px;

    ${breakpoints.down('sm')} {
      max-width: 280px;
    }

    & > .title {
      padding: ${spacingOf(1.25, 2)};
      background-color: ${colorOf(({ main }) => main.thick7)};
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

        &__callback-btns {
          text-align: center;

          & > .callback-btn:first-child {
            margin-right: ${spacingOf(1)}px;
          }
        }
      }
    }
  }
`;

export default StyledModalConfirm;
