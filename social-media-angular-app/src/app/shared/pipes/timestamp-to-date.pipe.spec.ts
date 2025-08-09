import { Timestamp } from '@angular/fire/firestore';
import { TimestampToDatePipe } from './timestamp-to-date.pipe';

describe('TimestampToDatePipe', () => {
  it('create an instance', () => {
    const pipe = new TimestampToDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('converts a Timestamp to a Date object', () => {
    const pipe = new TimestampToDatePipe();
    const timestamp = new Timestamp(1, 1);

    expect(pipe.transform(timestamp)).toEqual(timestamp.toDate());
  });
});
