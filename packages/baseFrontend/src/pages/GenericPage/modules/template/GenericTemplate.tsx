import React from 'react';

import { Props } from './GenericTemplate.props';

import { CFC, SCP } from '$types/index';

const GenericTemplate: CFC<SCP & Props> = ({
  className,
  Header,
  children,
  Footer
}) => {
  return (
    <div
      className={className}
    >
      <header>
        {Header}
      </header>
      <section>
        {children}
      </section>
      <footer>
        {Footer}
      </footer>
    </div>
  );
};

export default GenericTemplate;
