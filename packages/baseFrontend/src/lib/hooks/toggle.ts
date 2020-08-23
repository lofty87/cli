import { useState } from 'react';
import { isArray, reduce } from 'lodash';
import { Object } from '@lofty87/types';

/**
 * @name useToggle
 * * simple toggle hook
 */
export const useToggle = (initialValue = false) => {
  const [ value, setValue ] = useState(initialValue);

  const toggle = () => setValue((prevValue) => !prevValue);

  return {
    value,
    toggle,
  };
};

/**
 * @name useFixedToggle
 * * fixed toggle hook
 */
export const useFixedToggle = (initialValue = false) => {
  const [ value, setValue ] = useState(initialValue);

  const trueToggle = () => setValue(true);
  const falseToggle = () => setValue(false);

  return {
    value,
    trueToggle,
    falseToggle,
  };
};

/**
 * @name useMapToggle
 * * map toggle hook
 *
 * ? e.g. toggle
 * ? 1. toggle(): all toggle
 * ? 2. toggle('key'): key toggle
 * ? 3. toggle([ 'key1', 'key2' ]): keys toggle
 */
export const useMapToggle = <T extends Object>(initialMap: T) => {
  const [ map, setMap ] = useState(initialMap);

  const toggle = (keys?: keyof T | (keyof T)[]) => {
    if(!isArray(keys)) {
      if(!keys) {
        keys = Object.keys(map);
      } else {
        keys = [ keys ];
      }
    }

    const newMap = reduce<keyof T, T>(
      keys,
      (acc, key) => {
        acc[key] = !map[key] as any;

        return acc;
      },
      {} as T
    );

    setMap({
      ...map,
      ...newMap,
    });
  };

  return {
    map,
    toggle,
  };
};
