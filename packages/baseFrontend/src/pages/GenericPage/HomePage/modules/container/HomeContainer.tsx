import React from 'react';

import { NCFC, SCP } from '$types/index';

// * async, static data
const HomeContainer: NCFC<SCP> = ({
  className
}) => {
  return (
    <div
      className={className}
    >
      Base Frontend Sample
    </div>
  );
};

export default HomeContainer;
