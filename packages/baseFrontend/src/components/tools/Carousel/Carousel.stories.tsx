import React from 'react';
import { Carousel } from '@components/tools';

import { NCFC } from '$types/index';

export default {
  component: Carousel,
  title: 'Carousel',
};

type SlideProps = {
  src: string;
  href: string;
};

const Slide: NCFC<SlideProps> = ({
  src,
  href
}) => {
  const imgStyle = {
    maxWidth: '100%',
  };

  return (
    <a
      href={href}
    >
      <img
        style={imgStyle}
        alt={src}
        src={src}
      />
    </a>
  );
};

export const Default = () => (
  <Carousel>
    <Slide
      src="http://placehold.it/1920x1080"
      href="#"
    />
    <Slide
      src="http://placehold.it/1920x1080"
      href="#"
    />
    <Slide
      src="http://placehold.it/1920x1080"
      href="#"
    />
    <Slide
      src="http://placehold.it/1920x1080"
      href="#"
    />
  </Carousel>
);
