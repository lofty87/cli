import { useState } from 'react';
import { filter } from 'lodash';
import { Object } from '@lofty87/types';

/**
 * @name useMap
 * * simple map hook
 */
export const useMap = (initialMap: Object) => {
  const [ map, setMap ] = useState(initialMap);

  const set = (key: keyof Object, value: Object[keyof Object]) => {
    setMap((prevMap) => ({
      ...prevMap,
      [key]: value,
    }));
  };

  const unset = (key: keyof Object) => {
    const filtered = filter(map, (value, _key) => _key !== key) as Object;

    setMap({ ...filtered });
  };

  return {
    map,
    set,
    unset,
  };
};
