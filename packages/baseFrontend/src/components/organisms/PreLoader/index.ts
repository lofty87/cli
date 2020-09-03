import { css, styled } from '@styles/styled-components';
import { colorOf, fontOf, mappedBy, spacingOf } from '@styles/lib';

import PreLoader from './PreLoader';
import { Props } from './PreLoader.props';

const typeStyle = {
  'circle-line': css<Props>`
    & > .circle-line {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;

      div {
        animation: circle-line-keyframes 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        transform-origin: 40px 40px;
      }

      div:after {
        content: ' ';
        display: block;
        position: absolute;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: ${(props) => props.theme.colors[props.color!].thick4};
        margin: -4px 0 0 -4px;
      }

      div:nth-child(1) {
        animation-delay: -0.036s;
      }

      div:nth-child(1):after {
        top: 63px;
        left: 63px;
      }

      div:nth-child(2) {
        animation-delay: -0.072s;
      }

      div:nth-child(2):after {
        top: 68px;
        left: 56px;
      }

      div:nth-child(3) {
        animation-delay: -0.108s;
      }

      div:nth-child(3):after {
        top: 71px;
        left: 48px;
      }

      div:nth-child(4) {
        animation-delay: -0.144s;
      }

      div:nth-child(4):after {
        top: 72px;
        left: 40px;
      }

      div:nth-child(5) {
        animation-delay: -0.18s;
      }

      div:nth-child(5):after {
        top: 71px;
        left: 32px;
      }

      div:nth-child(6) {
        animation-delay: -0.216s;
      }

      div:nth-child(6):after {
        top: 68px;
        left: 24px;
      }

      div:nth-child(7) {
        animation-delay: -0.252s;
      }

      div:nth-child(7):after {
        top: 63px;
        left: 17px;
      }

      div:nth-child(8) {
        animation-delay: -0.288s;
      }

      div:nth-child(8):after {
        top: 56px;
        left: 12px;
      }

      @keyframes circle-line-keyframes {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }
    }
  `,
  circle: css<Props>`
    & > .circle {
      display: inline-block;
      transform: translateZ(1px);

      div {
        display: inline-block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        background: ${(props) => props.theme.colors[props.color!].thick4};
        animation: circle-keyframes 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
      }

      @keyframes circle-keyframes {
        0%,
        100% {
          animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
        }

        0% {
          transform: rotateY(0deg);
        }

        50% {
          transform: rotateY(1800deg);
          animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
        }

        100% {
          transform: rotateY(3600deg);
        }
      }
    }
  `,
  line: css<Props>`
    & > .line {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;

      div {
        display: inline-block;
        position: absolute;
        left: 8px;
        width: 10px;
        background: ${(props) => props.theme.colors[props.color!].thick4};
        animation: line-keyframes 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
      }

      div:nth-child(1) {
        left: 8px;
        animation-delay: -0.24s;
      }

      div:nth-child(2) {
        left: 32px;
        animation-delay: -0.12s;
      }

      div:nth-child(3) {
        left: 56px;
        animation-delay: 0;
      }

      @keyframes line-keyframes {
        0% {
          top: 8px;
          height: 64px;
        }

        50%,
        100% {
          top: 24px;
          height: 32px;
        }
      }
    }
  `,
};

const StyledPreLoader = styled(PreLoader).attrs((props) => ({
  type: props.type || 'circle-line',
  color: props.color || 'dark',
  verticalPadding: props.verticalPadding || 3,
}))`
  display: block;
  padding: ${(props) => spacingOf(props.verticalPadding, 0)};
  width: 100%;
  text-align: center;
  background-color: transparent;

  &.last-data {
    font-size: ${fontOf(({ body1 }) => body1.size)}rem;
    font-weight: ${fontOf(({ weight }) => weight.regular)};
    color: ${colorOf(({ dark }) => dark.thick7)};
  }

  ${({ type }) => mappedBy(typeStyle, type)}
`;

export default StyledPreLoader;
