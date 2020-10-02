import React, { MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { throttle } from 'lodash';
import { Dialog } from '@material-ui/core';
import { Button, H } from '@components/atoms';
import { actions, useStores } from '@stores/index';

import { NCFC, SCP } from '$types/index';

/**
 * * ModalConfirmStore 를 통해 state 를 관리.
 * * Enter 키를 통해 close 가능.
 *
 * ? fade 전환 효과중에 발생하는
 * ? initialize(), event issue 를
 * ? setTimeout 과 throttle 을 사용하여
 * ? 최대한 자연스럽게 동작하도록 작성
 */

const ModalConfirm: NCFC<SCP> = ({
  className,
  ...others
}) => {
  const {
    modalConfirm: {
      state: { open, title, message, agreeCallback, disAgreeCallback },
    },
  } = useStores();

  const handleAgreeCallback = throttle((e: MouseEvent) => {
    actions.modalConfirm.close();

    agreeCallback && agreeCallback(e);

    setTimeout(() => {
      actions.modalConfirm.initialize();
    }, 150);
  }, 1000);

  const handleDisAgreeCallback = throttle((e: MouseEvent) => {
    actions.modalConfirm.close();

    disAgreeCallback && disAgreeCallback(e);

    setTimeout(() => {
      actions.modalConfirm.initialize();
    }, 150);
  }, 1000);

  const enterKeyEventListener = (dialog: undefined | HTMLElement) => {
    if(dialog) {
      dialog.addEventListener('keydown', (e) => {
        e.preventDefault();

        if(e.key === 'Enter') {
          handleDisAgreeCallback(e as any);
        }
      });
    }
  };

  return (
    <Dialog
      ref={enterKeyEventListener}
      className={className}
      open={open}
      onClose={handleDisAgreeCallback}
      {...others}
    >
      {title && (
        <H
          className="title"
          type="h3"
          size="subtitle1"
          weight="bold"
          color="white"
        >
          {title}
        </H>
      )}
      <section
        className="content"
      >
        <section
          className="content__message"
        >
          {message}
        </section>
        <section
          className="content__callback-btns"
        >
          <Button
            className="callback-btn"
            color="main"
            length="medium"
            disableElevation
            onClick={handleAgreeCallback}
          >
            OK
          </Button>
          <Button
            className="callback-btn"
            color="dark"
            length="medium"
            variant="outlined"
            onClick={handleDisAgreeCallback}
          >
            닫기
          </Button>
        </section>
      </section>
    </Dialog>
  );
};

export default observer(ModalConfirm);
