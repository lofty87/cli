import React, { useEffect } from 'react';
import { ModalSpinner } from '@components/organisms';
import { actions } from '@stores/index';

export default {
  component: ModalSpinner,
  title: 'ModalSpinner',
};

export const Default = () => {
  useEffect(() => {
    actions.global.modalSpinner.show();
    actions.global.modalSpinner.pending();
  });

  return <ModalSpinner />;
};
