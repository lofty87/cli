import React, { useEffect } from 'react';
import { ModalSpinner } from '@components/organisms';
import { actions } from '@stores/index';

export default {
  component: ModalSpinner,
  title: 'ModalSpinner',
};

export const Default = () => {
  useEffect(() => {
    actions.modalSpinner.show();
    actions.modalSpinner.pending();
  });

  return <ModalSpinner />;
};
