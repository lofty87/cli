import React from 'react';
import { Button } from '@components/atoms';

export default {
  component: Button,
  title: 'Button',
};

export const Default = () => (
  <Button
    size="medium"
  >
    버튼
  </Button>
);

export const Variant = () => (
  <>
    <section>
      <h4>variant="text</h4>
      <Button
        variant="text"
      >
        버튼
      </Button>
    </section>
    <section>
      <h4>variant="outlined</h4>
      <Button
        variant="outlined"
      >
        버튼
      </Button>
    </section>
    <section>
      <h4>variant="contained</h4>
      <Button
        variant="contained"
      >
        버튼
      </Button>
    </section>
  </>
);

export const Color = () => (
  <>
    <section>
      <h4>$color="main"</h4>
      <Button
        $color="main"
      >
        버튼
      </Button>
    </section>
    <br />
    <section>
      <h4>$color="dark"</h4>
      <Button
        $color="dark"
      >
        버튼
      </Button>
    </section>
    <br />
    <section>
      <h4>$color="red"</h4>
      <Button
        $color="red"
      >
        버튼
      </Button>
    </section>
    <br />
    <section>
      <h4>$color="green"</h4>
      <Button
        $color="green"
      >
        버튼
      </Button>
    </section>
    <br />
    <section>
      <h4>$color="yellow"</h4>
      <Button
        $color="yellow"
      >
        버튼
      </Button>
    </section>
  </>
);
