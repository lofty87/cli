import { styled } from '@styles/styled-components';
import { colorOf, spacingOf } from '@styles/lib';

import Carousel from './Carousel';

const StyledCarousel = styled(Carousel)`
  .slick-arrow {
    z-index: 1;

    &.slick-prev {
      left: ${spacingOf(3)}px;
    }

    &.slick-next {
      right: ${spacingOf(3)}px;
    }

    &.slick-prev:before,
    &.slick-next:before {
      font-size: 24px;
      opacity: 0.2;
    }

    &.slick-prev:hover:before,
    &.slick-next:hover:before {
      opacity: 1;
    }
  }

  .carousel-dots {
    display: inline-block !important;
    right: ${spacingOf(3)}px;
    bottom: ${spacingOf(2)}px;
    width: unset;

    li {
      margin: 0 5px;

      button:before {
        content: '';
        width: 24px;
        height: 6px;
        border-radius: 2px;
        background-color: ${colorOf(({ white }) => white)};
      }
    }
  }
`;

export default StyledCarousel;
