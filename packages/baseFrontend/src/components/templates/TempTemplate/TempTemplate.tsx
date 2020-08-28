import React from 'react';

import { CFC, SCP } from '$types/index';

const TempTemplate: CFC<SCP> = ({
  className,
  children
}) => (
  <div
    className={className}
  >
    {children}
  </div>
);

export default TempTemplate;