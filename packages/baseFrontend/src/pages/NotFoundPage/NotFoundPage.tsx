import React, { MouseEventHandler } from 'react';
import { Button, H } from '@components/atoms';

import { NCFC, RRP, SCP } from '$types/index';

const NotFoundPage: NCFC<SCP & RRP> = ({
  className,
  history
}) => {
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
          <H
            className="status__code"
            type="h1"
            weight="bold"
            color="main"
          >
            404
          </H>
          <div
            className="status__message"
          >
            NOT FOUND
          </div>
        </section>
        <section
          className="home-btn"
        >
          <Button
            color="dark"
            length="medium"
            size="large"
            onClick={goHome}
          >
            Home
          </Button>
        </section>
      </article>
    </div>
  );
};

export default NotFoundPage;
