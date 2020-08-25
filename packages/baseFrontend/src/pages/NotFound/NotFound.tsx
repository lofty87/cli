import React, { MouseEventHandler } from 'react';

import { NCFC, RRP, SCP } from '$types/index';

const NotFound: NCFC<SCP & RRP> = ({
  className,
  history
}) => {
  const goHome: MouseEventHandler = (e) => {
    history.replace('/');
  };

  return (
    <article
      className={className}
    >
      <section
        className="status"
      >
        <h2
          className="status__code"
        >
          404
        </h2>
        <div
          className="status__message"
        >
          페이지를 찾을 수 없습니다.
        </div>
      </section>
      <section
        className="btn"
      >
      </section>
    </article>
  );
};

export default NotFound;
