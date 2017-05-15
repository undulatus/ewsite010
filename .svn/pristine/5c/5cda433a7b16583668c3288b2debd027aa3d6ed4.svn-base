import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { ModalDirective, ModalOptions } from 'ng2-bootstrap/modal';

@Component({
    moduleId: module.id,
    selector: 'notification-modal',
    templateUrl: 'notification-modal.html'
})
export class NotificationModalComponent implements OnInit {
    @ViewChild('smModal') public notificationModal: ModalDirective;
    @Input('title') title: String;
    @Input('body') body: String;
    @Input('confirmLabel') confirmLabel: String;
    constructor() { }

    private notifOptions: ModalOptions = {
        backdrop: false,
        keyboard: true,
        focus: true,
        ignoreBackdropClick: true
    };
    show() {
        this.notificationModal.show();
    }
    hide() {
        this.notificationModal.hide();
    }
    confirmAction() {
        this.notificationModal.hide();
    }
    ngOnInit() {
        this.notificationModal.config = this.notifOptions;
    }
}