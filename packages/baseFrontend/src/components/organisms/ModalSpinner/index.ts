import { styled } from '@styles/styled-components';
import { colorOf } from '@styles/lib';

import ModalSpinner from './ModalSpinner';

const StyledModalSpinner = styled(ModalSpinner)`
  & > .spinner {
    display: inline-block;
    position: relative;
    margin-top: 50vh;
    left: 50%;
    width: 80px;
    height: 80px;
    transform: translate(-50%, -50%);

    div {
      position: absolute;
      border: 4px solid ${colorOf(({ white }) => white)};
      opacity: 1;
      border-radius: 50%;
      animation: spinner-keyframes 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    div:nth-child(2) {
      animation-delay: -0.5s;
    }

    @keyframes spinner-keyframes {
      0% {
        top: 36px;
        left: 36px;
        width: 0;
        height: 0;
        opacity: 1;
      }

      100% {
        top: 0px;
        left: 0px;
        width: 72px;
        height: 72px;
        opacity: 0;
      }
    }
  }
`;

export default StyledModalSpinner;
