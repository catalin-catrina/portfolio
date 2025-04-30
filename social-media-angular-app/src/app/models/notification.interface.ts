import { Timestamp } from '@angular/fire/firestore';

export interface Notification {
  id?: string;
  resource_id: string | null;
  from_id: string;
  from_name: string;
  to_id: string;
  to_name: string;
  type: string;
  seen: boolean;
  createdAt: Timestamp;
}
