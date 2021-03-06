import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../domain/activity.model';
import { Opportunity } from '../domain/opportunity.model';
import { OpportunityActivity } from '../domain/opportunity-activity.model';

@Component({
    selector: 'activity-summary',
    templateUrl: 'activity-summary.component.html',
    styleUrls: ['./activity-summary.component.css']
})

export class ActivitySummaryComponent implements OnInit {
    dtActivitySummaryOptions: any = {};
    activity: Activity;
    @Input() activityTabs: any[];
    @Input() opportunity: Opportunity;
    ngOnInit(): void {
        this.dtActivitySummaryOptions = {
            paging: false,
            searching: false,
            info: false
        };
    }

}
