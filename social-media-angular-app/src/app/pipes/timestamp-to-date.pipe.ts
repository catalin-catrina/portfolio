import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'timestampToDate',
  standalone: true,
})
export class TimestampToDatePipe implements PipeTransform {
  transform(value: Timestamp | undefined, ...args: unknown[]): Date | null {
    return value ? value.toDate() : null;
  }
}
