import React, { ReactElement } from 'react';

import { Props } from './PreLoader.props';

import { NCFC, SCP } from '$types/index';

/**
 * * ModalSpinner 와는 다르게
 * * 부분적으로 직접 렌더링 할 수 있는 로더
 */

const PreLoader: NCFC<SCP & Props> = ({
  className,
  type = 'circle-line',
  color = 'dark',
  verticalPadding = 3,
  reqState,
  isLastData = false
}) => {
  if(isLastData) {
    return (
      <section
        className={`${className} last-data`}
      >
        모든 데이터가 로드되었습니다
      </section>
    );
  }

  if(reqState === 'pending') {
    let preLoader: ReactElement;

    switch(type) {
      case 'circle-line': {
        preLoader = (
          <div
            className="circle-line"
          >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        );

        break;
      }
      case 'circle': {
        preLoader = (
          <div
            className="circle"
          >
            <div></div>
          </div>
        );

        break;
      }
      case 'line': {
        preLoader = (
          <div
            className="line"
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        );

        break;
      }
    }

    return (
      <section
        className={className}
      >
        {preLoader}
      </section>
    );
  }

  return <section></section>;
};

export default PreLoader;
