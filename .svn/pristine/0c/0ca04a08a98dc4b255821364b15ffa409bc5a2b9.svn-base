import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { ModalDirective, ModalOptions } from 'ng2-bootstrap/modal';

@Component({
    moduleId: module.id,
    selector: 'delete-modal',
    templateUrl: 'delete-modal.html',
    styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
    @ViewChild('smModal') public deleteModal: ModalDirective;
    @Input('body') body: String;
    @Input('category') category: String;

    constructor() { }

    private notifOptions: ModalOptions = {
        backdrop: false,
        keyboard: true,
        focus: true,
        ignoreBackdropClick: true
    };
    confirmAction() {
    }
    show() {
        this.deleteModal.show();
    }
    hide() {
        this.deleteModal.hide();
    }
    cancelAction() {
        this.deleteModal.hide();
    }
    ngOnInit() {
        this.deleteModal.config = this.notifOptions;
    }
}