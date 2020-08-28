import React, { MouseEventHandler, useEffect } from 'react';
import { ModalConfirm } from '@components/organisms';
import { actions } from '@stores/index';

import { NCFC } from '$types/index';

type ModalConfirmContainerProps = {
  onClick: MouseEventHandler;
};

const ModalConfirmContainer: NCFC<ModalConfirmContainerProps> = ({
  onClick
}) => {
  useEffect(() => () => {
    actions.modalConfirm.close();
  });

  return (
    <>
      <button
        type="button"
        onClick={onClick}
      >
        activate
      </button>
      <ModalConfirm />
    </>
  );
};

export default {
  component: ModalConfirm,
  title: 'ModalConfirm',
};

const agreeCallback: MouseEventHandler = () => {
  console.log('agree');
};

const disAgreeCallback: MouseEventHandler = () => {
  console.log('disagree');
};

export const Default = () => {
  const handleOpen: MouseEventHandler = (e) => {
    e.preventDefault();

    actions.modalConfirm.config('확인', '확인 메시지입니다.').open(agreeCallback, disAgreeCallback);
  };

  return (
    <ModalConfirmContainer
      onClick={handleOpen}
    />
  );
};

export const Message = () => {
  const handleOpen: MouseEventHandler = (e) => {
    e.preventDefault();

    actions.modalConfirm.config('확인 메시지입니다.').open(agreeCallback, disAgreeCallback);
  };

  return (
    <ModalConfirmContainer
      onClick={handleOpen}
    />
  );
};
