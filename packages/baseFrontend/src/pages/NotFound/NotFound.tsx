import React, { MouseEventHandler } from 'react';

import { NCFC, RRP, SCP } from '$types/index';

const NotFound: NCFC<SCP & RRP> = ({ className, history }) => {
  const goHome: MouseEventHandler = (e) => {
    history.replace('/');
  };

  return (
    <div
      className={className}
    >
      <article>
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
            NOT FOUND
          </div>
        </section>
        <section
          className="btn"
        >
        </section>
      </article>
    </div>
  );
};

export default NotFound;
