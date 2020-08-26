import React, { MouseEventHandler } from 'react';
import { Button } from '@components/atoms';

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
          <h1
            className="status__code"
          >
            404
          </h1>
          <div
            className="status__message"
          >
            NOT FOUND
          </div>
        </section>
        <section
          className="btn"
        >
          <Button
            $color="dark"
            size="large"
            fullWidth
            onClick={goHome}
          >
            Home
          </Button>
        </section>
      </article>
    </div>
  );
};

export default NotFound;
