import { createElement } from 'react';

import { Props } from './H.props';

import { CFC, SCP } from '$types/index';

/**
 * * 기본 margin 값 제거.
 * * 과도한 line-height 값 수정. (theme 기준)
 */

const H: CFC<SCP & Props> = ({
  className,
  type,
  size = type,
  weight = 'regular',
  color = 'dark',
  thick = 'thick7',
  ...others
}) => {
  return createElement(type, {
    className,
    type,
    size,
    weight,
    color,
    thick,
    ...others,
  });
};

export default H;
