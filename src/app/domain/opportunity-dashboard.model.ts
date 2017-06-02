import {OpportunityCollaborator} from './opportunity-collaborator.model';
export class OpportunityDashboard {
    opportunityId: number;
    opportunityName: string;
    businessUnitName: string;
    serviceTypeName: String;
    projectStartDate: Date;
    opportunityStatus: string;
    documentStatus: string;
    clientName: string;
    opportunityCollaborators: OpportunityCollaborator[];
    userPermission: string;
}