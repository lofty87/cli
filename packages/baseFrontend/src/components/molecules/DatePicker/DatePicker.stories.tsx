import React, { useState } from 'react';
import moment from 'moment';
import { DatePicker } from '@components/molecules';

export default {
  component: DatePicker,
  title: 'DatePicker',
};

export const Default = () => {
  const now = moment();
  const [ date, setDate ] = useState(now);

  return (
    <>
      <section>
        <h4>default</h4>
        <DatePicker
          value={date}
          onChange={setDate as any}
        />
      </section>
      <br />
      <section>
        <h4>label="날짜"</h4>
        <DatePicker
          label="날짜"
          value={date}
          onChange={setDate as any}
        />
      </section>
      <br />
      <section>
        <h4>helperText="날짜를 입력해 주세요"</h4>
        <DatePicker
          value={date}
          helperText="날짜를 입력해 주세요"
          onChange={setDate as any}
        />
      </section>
    </>
  );
};

export const Shape = () => {
  const now = moment();
  const [ date, setDate ] = useState(now);

  return (
    <>
      <section>
        <h4>variant="static"</h4>
        <h4>
          <input
            type="text"
            value={date.format('YYYY-MM-DD')}
          />
        </h4>
        <DatePicker
          value={date}
          variant="static"
          onChange={setDate as any}
        />
      </section>
      <br />
      <section>
        <h4>
          disableToolbar=
          {'{false}'}
        </h4>
        <h4>
          <input
            type="text"
            value={date.format('YYYY-MM-DD')}
          />
        </h4>
        <DatePicker
          value={date}
          variant="static"
          disableToolbar={false}
          onChange={setDate as any}
        />
      </section>
      <br />
      <section>
        <h4>orientation="landscape"</h4>
        <h4>
          <input
            type="text"
            value={date.format('YYYY-MM-DD')}
          />
        </h4>
        <DatePicker
          value={date}
          variant="static"
          disableToolbar={false}
          orientation="landscape"
          onChange={setDate as any}
        />
      </section>
    </>
  );
};

// ! not resolved issue
// ! moment().add(7, 'days');
export const DateControl = () => {
  const now = moment();
  const before7Days = moment().subtract({ days: 7 });
  const after7Days = moment().add({ days: 7 });
  const [ date, setDate ] = useState(now);

  return (
    <>
      <section>
        <h4>disablePast</h4>
        <DatePicker
          value={date}
          minDateMessage="당일 이전 날짜는 선택할 수 없습니다"
          disablePast
          onChange={setDate as any}
        />
      </section>
      <br />
      <section>
        <h4>disableFuture</h4>
        <DatePicker
          value={date}
          maxDateMessage="당일 이후 날짜는 선택할 수 없습니다"
          disableFuture
          onChange={setDate as any}
        />
      </section>
      <br />
      <section>
        <h4>minDate</h4>
        <DatePicker
          value={date}
          minDate={before7Days}
          minDateMessage="7일 이전 날짜는 선택할 수 없습니다"
          onChange={setDate as any}
        />
      </section>
      <br />
      <section>
        <h4>maxDate</h4>
        <DatePicker
          value={date}
          maxDate={after7Days}
          maxDateMessage="7일 이후 날짜는 선택할 수 없습니다"
          onChange={setDate as any}
        />
      </section>
      <br />
      <section>
        <h4>Directly (e.g. disable Sun, Sat)</h4>
        <DatePicker
          value={date}
          shouldDisableDate={(day) => {
            const isSunday = day?.day() === 0;
            const isSaturday = day?.day() === 6;

            return isSunday || isSaturday;
          }}
          onChange={setDate as any}
        />
      </section>
    </>
  );
};
