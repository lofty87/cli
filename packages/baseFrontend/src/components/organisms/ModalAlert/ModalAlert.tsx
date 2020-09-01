import React from 'react';
import { observer } from 'mobx-react';
import { throttle } from 'lodash';
import { Dialog } from '@material-ui/core';
import { Button } from '@components/atoms';
import { actions, useStores } from '@stores/index';

import { NCFC, SCP } from '$types/index';

/**
 * * ModalAlertStore 를 통해 state 를 관리.
 * * Enter 키를 통해 close 가능.
 *
 * ? fade 전환 효과중에 발생하는
 * ? initialize(), event issue 를
 * ? setTimeout 과 throttle 을 사용하여
 * ? 최대한 자연스럽게 동작하도록 작성
 */

type Usage = 'inform' | 'warn' | 'error';

const defaultTitle: Record<Usage, string> = {
  inform: '알림',
  warn: '경고',
  error: '오류',
};

const ModalAlert: NCFC<SCP> = ({
  className,
  ...others
}) => {
  const {
    modalAlert: {
      state: {
        usage,
        title,
        message,
        open
      },
    },
  } = useStores();

  const handleClose = throttle(() => {
    actions.modalAlert.close();

    setTimeout(() => {
      actions.modalAlert.initialize();
    }, 150);
  }, 1000);

  const enterKeyEventListener = (dialog: undefined | HTMLElement) => {
    if(dialog) {
      dialog.addEventListener('keydown', (event) => {
        event.preventDefault();

        if(event.key === 'Enter') {
          handleClose();
        }
      });
    }
  };

  return (
    <Dialog
      ref={enterKeyEventListener}
      className={`${className} modal-alert--${usage}`}
      open={open}
      onClose={handleClose}
      {...others}
    >
      <h3
        className="title"
      >
        {title || defaultTitle[usage]}
      </h3>
      <section
        className="content"
      >
        <section
          className="content__message"
        >
          {message}
        </section>
        <section
          className="content__close-btn"
        >
          <Button
            color="dark"
            length="medium"
            variant="outlined"
            onClick={handleClose}
          >
            닫기
          </Button>
        </section>
      </section>
    </Dialog>
  );
};

export default observer(ModalAlert);
