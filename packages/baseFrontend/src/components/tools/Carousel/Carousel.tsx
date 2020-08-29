import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';
import Slider from 'react-slick';

import { Props } from './Carousel.props';

import { CFC, SCP } from '$types/index';

const Carousel: CFC<SCP & Props> = ({
  className,
  autoplay = true,
  dots = true,
  dotsClass = 'slick-dots carousel-dots',
  infinite = true,
  pauseOnHover = true,
  speed = 500,
  children,
  ...others
}) => (
  <Slider
    className={className}
    autoplay={autoplay}
    dots={dots}
    dotsClass={dotsClass}
    infinite={infinite}
    pauseOnHover={pauseOnHover}
    speed={speed}
    {...others}
  >
    {children}
  </Slider>
);

export default Carousel;
