import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../domain/activity.model';
import { OpportunityActivity } from '../domain/opportunity-activity.model';

@Component({
    selector: 'activity-summary',
    templateUrl: 'activity-summary.component.html',
    styleUrls: ['./activity-summary.component.css']
})

export class ActivitySummaryComponent implements OnInit {
    dtActivitySummaryOptions: any = {};
    activity: Activity;
    @Input() opportunityActivities: OpportunityActivity[];

    ngOnInit(): void {
        this.dtActivitySummaryOptions = {
            // displayLength: 2,
            paging: false,
            searching: false,
            info: false
        };
    }

    public accordions: any[] = [
        {
            id: 'accord1',
            activity: 'Requirements Engineering',
            duration: 1,
            start: 1,
            resource: [/*{
                role: 'Project Manager',
                technology: 'Iterative',
                paylevel: 'PM',
                start: 1,
                duration: 1,
                fte: 0.2,
                billable: 'Yes'
            }, {
                role: 'Developer',
                technology: 'Iterative',
                paylevel: 'SE4',
                start: 2,
                duration: 2,
                fte: 0.4,
                billable: 'No'
            }*/]
        }, {
            id: 'accord2',
            activity: 'Application Management',
            duration: 2,
            start: 2,
            resource: [/*{
                role: 'Developer',
                technology: 'Iterative',
                paylevel: 'SE4',
                start: 2,
                duration: 2,
                fte: 0.4,
                billable: 'No'
            }*/]
        }
    ]
}
