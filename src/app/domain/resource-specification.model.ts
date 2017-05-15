import {Role} from './role.model';
import {Practice} from './practice.model';
import {PayLevel} from './pay-level.model';

export class ResourceSpecification {
  resourceSpecificationId: number;
  role: Role;
  practice: Practice;
  payLevel: PayLevel;
  isBillable: boolean;
  opportunityActivityId: number;
  // WeeklyFTE: Map<number, number>;
}