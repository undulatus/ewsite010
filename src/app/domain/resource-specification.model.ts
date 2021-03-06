import {Role} from './role.model';
import {Practice} from './practice.model';
import {PayLevel} from './pay-level.model';

export class ResourceSpecification {
  resourceSpecificationId: number;
  role: Role;
  practice: Practice;
  payLevel: PayLevel;
  billable: Boolean;
  opportunityActivityId: number;
  totalFTE: number;
  durationInWeeks: number;
  roleStartDate: Date;
  // WeeklyFTE: Map<number, number>;
}