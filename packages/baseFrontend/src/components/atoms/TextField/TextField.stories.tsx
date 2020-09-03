import React from 'react';
import { FaUser } from 'react-icons/fa';
import { InputAdornment } from '@material-ui/core';
import { TextField } from '@components/atoms';

export default {
  component: TextField,
  title: 'TextField',
};

export const Default = () => (
  <>
    <section>
      <h4>default</h4>
      <TextField
        size="medium"
      />
    </section>
    <br />
    <section>
      <h4>defaultValue="기본값"</h4>
      <TextField
        label="이메일"
        defaultValue="기본값"
      />
    </section>
    <br />
    <section>
      <h4>textAlign="center"</h4>
      <TextField
        textAlign="center"
        defaultValue="중앙"
      />
    </section>
    <br />
    <section>
      <h4>label="이메일"</h4>
      <TextField
        label="이메일"
      />
    </section>
    <br />
    <section>
      <h4>placeholder="이메일을 입력해 주세요"</h4>
      <TextField
        placeholder="이메일을 입력해 주세요"
      />
    </section>
    <br />
    <section>
      <h4>helperText="이메일은 필수 입력입니다"</h4>
      <TextField
        label="이메일"
        helperText="이메일은 필수 입력입니다"
      />
    </section>
  </>
);

export const State = () => (
  <>
    <section>
      <h4>required</h4>
      <TextField
        label="이메일"
        helperText="이메일은 필수 입력입니다"
        required
      />
    </section>
    <br />
    <section>
      <h4>disabled</h4>
      <TextField
        value="lofty87@daum.net"
        disabled
      />
    </section>
    <br />
    <section>
      <h4>error</h4>
      <TextField
        label="이메일"
        helperText="이메일은 필수 입력입니다"
        error
      />
    </section>
  </>
);

export const Advanced = () => (
  <>
    <section>
      <h4>Input Adornment (start)</h4>
      <TextField
        label="이름"
        placeholder="이름을 입력해 주세요."
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
            >
              <FaUser />
            </InputAdornment>
          ),
        }}
      />
    </section>
    <br />
    <section>
      <h4>Input Adornment (end)</h4>
      <TextField
        label="내용"
        placeholder="내용을 입력해 주세요."
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
            >
              Kg
            </InputAdornment>
          ),
        }}
      />
    </section>
    <br />
    <section>
      <h4>multiline (fixed)</h4>
      <TextField
        label="내용"
        placeholder="내용을 입력해 주세요."
        rows={4}
        multiline
      />
    </section>
    <br />
    <section>
      <h4>multiline (dynamic)</h4>
      <TextField
        label="내용"
        placeholder="내용을 입력해 주세요."
        rowsMax={4}
        multiline
      />
    </section>
    <br />
    <section>
      <h4>fullWidth</h4>
      <TextField
        label="내용"
        placeholder="내용을 입력해 주세요."
        fullWidth
      />
    </section>
  </>
);
