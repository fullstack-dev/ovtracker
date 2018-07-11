import * as moment from 'moment';
import _date = moment.unitOfTime._date;

export interface CycleData {
  uid: string;
  cycleId?: string;
  periodStartDate?: _date;
  periodEndDate?: _date;
}
