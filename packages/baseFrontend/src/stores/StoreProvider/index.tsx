import React, { createContext, useContext } from 'react';

import { Props } from './StoreProvider.props';

import { CFC } from '$types/index';

type Stores = Props['stores'];

const StoreContext = createContext<null | Stores>(null);

// ! stores hook (required wrapping observer at using component)
export const useStores = () => useContext(StoreContext) as Stores;

const StoreProvider: CFC<Props> = ({
  stores,
  children
}) => {
  return (
    <StoreContext.Provider
      value={stores}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
