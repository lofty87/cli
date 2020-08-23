import { useEffect } from 'react';
import { Function } from '@lofty87/types';

/**
 * @name useMountEffect
 * @param didMount
 * @param willUnmount
 *
 * * useEffect 를 통해 componentDidMount, componentWillUnmount 를 구현할 때,
 * * 조금 더 가독성 있고 편하게 작성하기 위해
 */
export const useMountEffect = (didMount: Function, willUnmount?: Function) => {
  useEffect(() => {
    didMount();

    if(willUnmount) {
      return () => {
        willUnmount();
      };
    }

    return () => {};
  }, []);
};
