import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

import { AlertService } from '@app/_services';

@Component({
    selector: 'alert', templateUrl: 'alert.component.html',
    standalone: true,
    imports: [NgIf, NgClass]
})
export class AlertComponent implements OnInit, OnDestroy {
    private subscription!: Subscription;
    alert: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.onAlert()
            .subscribe(alert => {
                switch (alert?.type) {
                    case 'success':
                        alert.cssClass = 'alert alert-success';
                        break;
                    case 'error':
                        alert.cssClass = 'alert alert-danger';
                        break;
                }

                this.alert = alert;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}