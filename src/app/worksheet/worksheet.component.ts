import { Component, Input, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { ModalDirective, ModalOptions } from 'ng2-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';

import { Opportunity } from '../domain/opportunity.model';
import { OpportunityService } from '../services/opportunity.service';
import { OpportunityActivity } from '../domain/opportunity-activity.model';
import { OpportunityActivityService } from '../services/opportunity-activity.service';
import { Activity } from '../domain/activity.model';
import { ActivityService } from '../services/activity.service';
import { BusinessUnit } from '../domain/business-unit.model';
import { BusinessUnitService } from '../services/business-unit.service';
import { ServiceType } from '../domain/service-type.model';
import { ServiceTypeService } from '../services/service-type.service';
import { Role } from '../domain/role.model';
import { RoleService } from '../services/role.service';
import { ResourceSpecification } from '../domain/resource-specification.model';
import { ResourceSpecificationService } from '../services/resource-specification.service';


@Component({
    moduleId: module.id,
    templateUrl: 'worksheet.component.html',
    styleUrls: ['./worksheet.component.css'],
    providers: [ActivityService, BusinessUnitService, ServiceTypeService, RoleService, ResourceSpecificationService, OpportunityService, OpportunityActivityService]
})

export class WorksheetComponent implements OnInit, AfterViewInit {
    @ViewChild('addActivityModal') public addActivityModal: ModalDirective;
    @ViewChild('addActivityModalSelect') addActivityModalSelect;
    @ViewChild('addRoleModal') public addRoleModal: ModalDirective;
    @ViewChild('addRoleModalSelect') addRoleModalSelect;
    @ViewChild('deleteActivityModal') public deleteActivityModal: ModalDirective;
    @ViewChild('activityList') activityList;

    @ViewChild('opportunityNameView') opportunityNameView;
    @ViewChild('opportunityNameEdit') opportunityNameEdit;
    @ViewChild('durationGranularity') durationGranularity;
    @ViewChild('businessUnitView') businessUnitView;
    @ViewChild('businessUnitEdit') businessUnitEdit;
    @ViewChild('opportunityDuration') opportunityDuration;
    @ViewChild('serviceTypeView') serviceTypeView;
    @ViewChild('serviceTypeEdit') serviceTypeEdit;
    @ViewChild('projectStartDateView') projectStartDateView;
    @ViewChild('projectStartDateEdit') projectStartDateEdit;
    @ViewChild('opportunityStatusView') opportunityStatusView;
    @ViewChild('opportunityStatusEdit') opportunityStatusEdit;

    errorMessage: string;
    returnData: Opportunity;
    mode: string;
    opportunityId: number;

    opportunity: Opportunity;
    opportunities: Opportunity[];
    activity: Activity;
    activities: Activity[];
    opportunityActivity: OpportunityActivity;
    opportunityActivities: OpportunityActivity[];
    businessUnit: BusinessUnit;
    businessUnits: BusinessUnit[];
    serviceType: ServiceType;
    serviceTypes: ServiceType[];
    role: Role;
    roles: Role[];
    resourceSpecification: ResourceSpecification;
    resourceSpecifications: ResourceSpecification[];
    

    versions = ['v.1', 'v.2', 'v.3'];
    items: any = [];
    selectedIdx = 0;
    selectedOpportunityActivityId: number;
    selectedOpportunityActivityName: string;

    private projectStartDate: Object = {};
    // https://github.com/kekeh/mydatepicker
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
    };

    constructor(
        private elRef: ElementRef,
        private changeDetector: ChangeDetectorRef,
        private route: ActivatedRoute,
        private activityService: ActivityService,
        private businessUnitService: BusinessUnitService,
        private serviceTypeService: ServiceTypeService,
        private roleService: RoleService,
        private resourceSpecificationService: ResourceSpecificationService,
        private opportunityService: OpportunityService,
        private opportunityActivityService: OpportunityActivityService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.mode = params['mode'];
            this.opportunityId = params['opportunityId'];
        });

        this.opportunity = new Opportunity();
        this.opportunityActivities = new Array<OpportunityActivity>();
        // this.durationGranularity.nativeElement.value = 'monthly';
        this.getOpportunityElements();
    }

    ngAfterViewInit() {
        this.opportunity.durationGranularity = this.durationGranularity.nativeElement.value;
        this.opportunity.opportunityId = this.opportunityId;
        console.log("**********************************");
        console.log("mode: ", this.mode);
        console.log("opportunityId: ", this.opportunityId);
        console.log("**********************************");

        this.opportunityService.fetchOpportunity(this.opportunityId).then(response => {
            if (response != null) {
                this.opportunity = response;
                this.opportunityNameEdit.nativeElement.value = response.opportunityName;
                this.durationGranularity.nativeElement.value = response.durationGranularity;
                this.businessUnitEdit.nativeElement.value = response.businessUnit.businessUnitId;
                this.opportunityStatusEdit.nativeElement.value = response.opportunityStatus;
                this.serviceTypeEdit.nativeElement.value = response.serviceType.serviceTypeId;
                if (response.serviceType.serviceTypeId != 0 || response.serviceType.serviceTypeId != null) {
                    this.getActivitiesAndRolesByServiceTypeId(this.opportunity);
                }
                if (response.durationInWeeks != 0) {
                    if (response.durationGranularity == "monthly") {
                        this.opportunityDuration.nativeElement.value = response.durationInWeeks / 4;
                    } else {
                        this.opportunityDuration.nativeElement.value = response.durationInWeeks;
                    }
                } else {
                    this.opportunityDuration.nativeElement.value = '';
                }

                // console.log("response.projectStartDate: ", response.projectStartDate);
                // this.projectStartDateEdit.nativeElement.value = '2017-04-06';
                // this.projectStartDateEdit.nativeElement.value = response.projectStartDate;
                this.changeDetector.detectChanges();
            }
        }).catch(error => this.errorMessage = <any>error);
    }

    getOpportunityElements() {
        this.businessUnitService.fetchAllBusinessUnit().then(response => {
            this.businessUnits = response;
            this.changeDetector.detectChanges();
        }).catch(error => this.errorMessage = <any>error);

        this.serviceTypeService.fetchAllServiceType().then(response => {
            this.serviceTypes = response;
            this.changeDetector.detectChanges();
        }).catch(error => this.errorMessage = <any>error);
    }

    serviceUpdateOpportunity() {
        this.opportunityService.updateOpportunity(this.opportunity).then(response => {
            this.changeDetector.detectChanges();
        }).catch(error => this.errorMessage = <any>error);
    }

    updateOpportunityName(element) {
        this.opportunity.opportunityName = element.value;
        this.serviceUpdateOpportunity();
    }

    updateBusinessUnit(element) {
        if (element.children[0].value == 0) element.children[0].remove();
        this.businessUnit = new BusinessUnit();
        this.businessUnit.businessUnitId = element.value;
        this.opportunity.businessUnit = this.businessUnit;
        this.serviceUpdateOpportunity();
    }

    updateServiceType(element) {
        if (element.children[0].value == 0) element.children[0].remove();
        this.serviceType = new ServiceType();
        this.serviceType.serviceTypeId = element.value;
        this.opportunity.serviceType = this.serviceType;
        this.serviceUpdateOpportunity();

        this.getActivitiesAndRolesByServiceTypeId(this.opportunity);
    }

    updateDurationGranularity(element) {
        this.opportunityDuration.nativeElement.value = "";
        this.opportunity.durationInWeeks = 0;
        this.opportunity.durationGranularity = element.value;
        this.serviceUpdateOpportunity();
    }

    updateOpportunityDuration(element) {
        // user should not be able to input numbers more than the speicified max
        // no validation for this yet
        this.durationGranularity.nativeElement.value == 'monthly' ? this.opportunity.durationInWeeks = element.value * 4 : this.opportunity.durationInWeeks = element.value;
        this.serviceUpdateOpportunity();
    }

    updateOpportunityStatus(element) {
        this.opportunity.opportunityStatus = element.value;
        this.serviceUpdateOpportunity();
    }

    updateProjectStartDate(event: IMyDateModel) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
        this.opportunity.projectStartDate = new Date(event.formatted);
        this.serviceUpdateOpportunity();
    }

    getActivitiesAndRolesByServiceTypeId(opportunity) {
        // console.log("*** getActivitiesAndRolesByServiceTypeId in: ", opportunity);
        this.opportunityService.updateOpportunityWithLoadedActivities(opportunity).then(response => {
            // console.log("--- opportunityActivities: ", response.opportunityActivities);
            this.opportunityActivities = response.opportunityActivities;
            this.changeDetector.detectChanges();
        }).catch(error => this.errorMessage = <any>error);

        this.roleService.fetchRolesByServiceTypeId(opportunity.serviceType.serviceTypeId).then(response => {
            this.roles = response;
            this.changeDetector.detectChanges();
        }).catch(error => this.errorMessage = <any>error);
    }

    createOpportunity() {
        console.log('******************* createOpportunity *********************');
        /* needs to create modal for confirmation of saving the opportunity as per indicated version */
    }

    public tabs: any[] = [
        {
            id: 1,
            title: 'Requirements Engineering',
            // removable: true,
            resource: [{
                role: 'Project Manager',
                technology: 'Iterative',
                paylevel: 'PM',
                billable: 'Yes',
                period: [0.2, 1.0]
            }, {
                role: 'Developer',
                technology: 'Iterative',
                paylevel: 'SE4',
                billable: 'No',
                period: [0.3, 1.0, 0.7]
            }]
        }, {
            id: 2,
            title: 'Application Management',
            // removable: true,
            resource: [{
                role: 'QA',
                technology: 'Iterative',
                paylevel: 'SE3',
                billable: 'No',
                period: [0.4, 1.0, 0.8, 0.6]
            }, {
                role: 'BA',
                technology: 'Iterative',
                paylevel: 'SE2',
                billable: 'Yes',
                period: [0.5, 1.0, 0.9]
            }]
        }
    ];

    check() {
        console.log("test sample");
    }

    selectItem(index): void {
        this.selectedIdx = index;
    }

    createRange(number) {
        this.items = [];
        for (var i = 1; i <= number; i++) {
            this.items.push(i);
        }
        return this.items;
    }

    cancelModal() {
        this.addActivityModal.hide();
        this.addRoleModal.hide();
        this.deleteActivityModal.hide();
    }

    deleteActivity(opportunityActivity) {
        this.selectedOpportunityActivityId = opportunityActivity.opportunityActivityId;
        this.selectedOpportunityActivityName = opportunityActivity.activity.activityName;
        this.deleteActivityModal.show()
    }

    confirmAddActivityModal(activityId) {
        console.log("activityId: ", activityId);
    }

    confirmDeleteActivity(opportunityActivityId) {
        // console.log("opportunityActivityId: ", opportunityActivityId);
        this.opportunityActivityService.deleteOpportunityActivity(opportunityActivityId).then(response => {
            // console.log("response: ", response);
            this.changeDetector.detectChanges();
        }).catch(error => this.errorMessage = <any>error);

        // this.opportunityService.updateOpportunityWithLoadedActivities(this.opportunity).then(response => {
        //     this.opportunityActivities = response.opportunityActivities;
        //     this.changeDetector.detectChanges();
        // }).catch(error => this.errorMessage = <any>error);
        location.reload();

        this.deleteActivityModal.hide();
    }

    confirmRoleModal(roleId) {
        this.selectedOpportunityActivityId = this.activityList.nativeElement.querySelector('li.active').attributes.id.nodeValue.slice(22);
        this.role = new Role;
        this.role.roleId = roleId;
        this.resourceSpecification = new ResourceSpecification;
        this.resourceSpecification.role = this.role;
        this.resourceSpecification.opportunityActivityId = this.selectedOpportunityActivityId;

        this.resourceSpecificationService.saveResourceSpecification(this.resourceSpecification).then(response => {
            console.log("+++ response: ", response);
			this.changeDetector.detectChanges();
		}).catch(error => this.errorMessage = <any>error);

        this.resourceSpecifications = [];

        this.addRoleModal.hide();
    }

}
