import { BusinessUnit } from './business-unit.model';
import { ServiceType } from './service-type.model';
import { OpportunityActivity } from './opportunity-activity.model';
import { User } from './user.model';
import { Employee } from './employee.model';

export class Opportunity {
  opportunityId: number;
  opportunityName: string;
  opportunityStatus: string;
  businessUnit: BusinessUnit;
  serviceType: ServiceType;
  durationGranularity: string;
  durationInWeeks: number;
  projectStartDate: Date;
  projectEndDate: Date;
  documentStatus: string;
  clientName: string;
  projectAlias: string;
  permission: string;
  username: string;
  opportunityActivities: OpportunityActivity[];
  employee: Employee;
}