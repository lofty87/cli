import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@stores/index';

import { Props } from './InfiniteScroll.props';

import { CFC } from '$types/index';

/**
 * * 1. axios 또는 api 를 사용하여 무한스크롤 구성.
 * ?    (RequestStore 를 통해 state 를 관리)
 * * 2. document 의 bottom - 30px 부터 bottom 사이에서 scrollEvent 가 호출되도록 구현.
 * ?    (device issue 타협점)
 * * 3. request 가 pending 상태이거나 pause 가 true 일 때는 scrollEvent 가 호출되지 않도록 구현.
 * ?    (중복 request 요청 및 무한스크롤링 issue 해결)
 * * 4. targetRef 를 설정하여 target 영역으로 무한스크롤 가능.
 *
 * ! height, scrollTop 을 복잡하게 가져오는 이유는 device issue 해결을 위해.
 * ! render 할 때마다, 새로운 event 를 등록, 삭제하는 것에 유의!
 */

type TargetEl = Props['targetRef'];

const getTargetElHeight = (targetEl: TargetEl) => {
  const targetElCurrent = targetEl && targetEl.current;

  if(targetElCurrent) {
    return Math.max(
      targetElCurrent.scrollHeight,
      targetElCurrent.offsetHeight,
      targetElCurrent.clientHeight
    );
  }

  const html = document.documentElement;
  const { body } = document;

  return Math.max(
    html.scrollHeight,
    html.offsetHeight,
    html.clientHeight,
    body.scrollHeight,
    body.offsetHeight
  );
};

const getTargetElScrollTop = (targetEl: TargetEl) => {
  const targetElCurrent = targetEl && targetEl.current;

  if(targetElCurrent) {
    return Math.ceil(
      targetElCurrent.scrollTop
    );
  }

  return Math.ceil(
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop
  );
};

const InfiniteScroll: CFC<Props> = observer(({
  onBottom,
  pause = false,
  targetRef: targetEl = undefined,
  children
}) => {
  const { request } = useStores();
  const reqState = request.get('common');

  const scrollEvent = useCallback(
    (e: Event) => {
      const windowHeight = window.innerHeight;
      const targetElHeight = getTargetElHeight(targetEl);
      const targetElScrollTop = getTargetElScrollTop(targetEl);

      if(targetElHeight - 30 <= targetElScrollTop + windowHeight) {
        onBottom();
      }
    },
    [ targetEl, onBottom ]
  );

  useEffect(() => {
    const enabledScrollEvent = reqState === 'done' && pause === false;

    if(enabledScrollEvent) {
      const targetElCurrent = (targetEl && targetEl.current) || window;

      targetElCurrent.addEventListener('scroll', scrollEvent);

      return () => {
        targetElCurrent.removeEventListener('scroll', scrollEvent);
      };
    }

    return undefined as void;
  });

  return children as React.ReactElement;
});

export default InfiniteScroll;
