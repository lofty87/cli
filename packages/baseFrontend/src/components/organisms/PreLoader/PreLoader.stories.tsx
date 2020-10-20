import React from 'react';
import { PreLoader } from '@components/organisms';

export default {
  component: PreLoader,
  title: 'PreLoader',
};

export const Default = () => (
  <>
    <section>
      <h4>default</h4>
      <PreLoader
        reqState="pending"
      />
    </section>
    <br />
    <section>
      <h4>
        verticalPadding=
        {'{spacing}'}
      </h4>
      <PreLoader
        verticalPadding={16}
        reqState="pending"
      />
    </section>
    <br />
    <section>
      <h4>
        completed=
        {'{true}'}
      </h4>
      <PreLoader
        reqState="done"
        completed
      />
    </section>
  </>
);

export const Type = () => (
  <>
    <section>
      <h4>type="circle-line"</h4>
      <PreLoader
        type="circle-line"
        reqState="pending"
      />
    </section>
    <br />
    <section>
      <h4>type="circle"</h4>
      <PreLoader
        type="circle"
        reqState="pending"
      />
    </section>
    <br />
    <section>
      <h4>type="line"</h4>
      <PreLoader
        type="line"
        reqState="pending"
      />
    </section>
  </>
);

export const Color = () => (
  <>
    <section>
      <h4>color="main"</h4>
      <PreLoader
        color="main"
        reqState="pending"
      />
    </section>
    <br />
    <section>
      <h4>color="dark"</h4>
      <PreLoader
        color="dark"
        reqState="pending"
      />
    </section>
    <br />
    <section>
      <h4>color="red"</h4>
      <PreLoader
        color="red"
        reqState="pending"
      />
    </section>
    <br />
    <section>
      <h4>color="blue"</h4>
      <PreLoader
        color="blue"
        reqState="pending"
      />
    </section>
    <br />
    <section>
      <h4>color="green"</h4>
      <PreLoader
        color="green"
        reqState="pending"
      />
    </section>
    <br />
    <section>
      <h4>color="yellow"</h4>
      <PreLoader
        color="yellow"
        reqState="pending"
      />
    </section>
  </>
);
