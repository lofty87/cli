import React, { MouseEventHandler, useEffect } from 'react';
import { ModalAlert } from '@components/organisms';
import { actions } from '@stores/index';

import { NCFC } from '$types/index';

type ModalAlertContainerProps = {
  onClick: MouseEventHandler;
};

const ModalAlertContainer: NCFC<ModalAlertContainerProps> = ({
  onClick
}) => {
  useEffect(() => () => {
    actions.modalAlert.close();
  });

  return (
    <>
      <button
        type="button"
        onClick={onClick}
      >
        activate
      </button>
      <ModalAlert />
    </>
  );
};

export default {
  component: ModalAlert,
  title: 'ModalAlert',
};

export const Inform = () => {
  const handleOpen: MouseEventHandler = (e) => {
    e.preventDefault();

    actions.modalAlert.inform('알림 메시지입니다.').open();
  };

  return (
    <ModalAlertContainer
      onClick={handleOpen}
    />
  );
};

export const Warn = () => {
  const handleOpen: MouseEventHandler = (e) => {
    e.preventDefault();

    actions.modalAlert.warn('경고', '경고 메시지입니다.').open();
  };

  return (
    <ModalAlertContainer
      onClick={handleOpen}
    />
  );
};

export const Error = () => {
  const handleOpen: MouseEventHandler = (e) => {
    e.preventDefault();

    actions.modalAlert.error('오류', '오류 메시지입니다.').open();
  };

  return (
    <ModalAlertContainer
      onClick={handleOpen}
    />
  );
};
