import React from 'react';
import { observer } from 'mobx-react-lite';
import { Modal } from '@material-ui/core';
import { useStores } from '@stores/index';

import { NCFC, SCP } from '$types/index';

/**
 * * store 를 통해 ModalSpinner state 를 관리
 *
 * * axios 또는 api 를 호출하기 전에 show() action 을 호출하면
 * * pending 상태에서 ModalSpinner 를 볼 수 있다.
 *
 * ? axios 를 interceptor 하여 안에서 request state 를 처리
 */

const ModalSpinner: NCFC<SCP> = ({
  className
}) => {
  const {
    global: {
      modalSpinner: {
        state: { reqState },
      },
    },
  } = useStores();

  return (
    <Modal
      className={className}
      open={reqState}
      disableAutoFocus
      disableEscapeKeyDown
      disableRestoreFocus
    >
      <div
        className="spinner"
      >
        <div></div>
        <div></div>
      </div>
    </Modal>
  );
};

export default observer(ModalSpinner);
