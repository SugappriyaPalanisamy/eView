import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

import { AuthenticationService } from '@app/_services';

import { NgbModal, NgbModalRef, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '@environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    idleState = 'Not started.';
    timedOut = false;
    lastPing?: Date = null;
    title = 'angular-idle-timeout';
    modalOptions: NgbModalOptions;
    closeResult: string;
    modalReference: NgbModalRef;

    @ViewChild('childModal') childModal;

    constructor(private idle: Idle, private keepalive: Keepalive, private router: Router, private authenticationService: AuthenticationService, private modalService: NgbModal) {
        this.modalOptions = {
            backdrop: 'static',
            backdropClass: 'customBackdrop'
        }
        // sets an idle timeout of 5 seconds, for testing purposes.
        idle.setIdle(environment.sessionTimeout);
        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        idle.setTimeout(5);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        idle.onIdleEnd.subscribe(() => {
            this.idleState = 'No longer idle.'
            console.log(this.idleState);
            this.reset();
        });

        idle.onTimeout.subscribe(() => {
            this.closeModal();
            this.idleState = 'Timed out!';
            this.timedOut = true;
            console.log(this.idleState);
            this.logout();
            
        });

        idle.onIdleStart.subscribe(() => {
            this.idleState = 'You\'ve gone idle!';
            this.openModal(this.childModal);
            console.log(this.idleState);

            
        });

        idle.onTimeoutWarning.subscribe((countdown) => {
            this.idleState = 'You will time out in ' + countdown + ' seconds!'
            console.log(this.idleState);
        });

        // sets the ping interval to 15 seconds
        keepalive.interval(15);

        keepalive.onPing.subscribe(() => this.lastPing = new Date());

        this.authenticationService.getUserLoggedIn().subscribe(userLoggedIn => {
            if (userLoggedIn) {
                idle.watch()
                this.timedOut = false;
            } else {
                idle.stop();
            }
        })

        //this.reset();
    }

    reset() {
        this.idle.watch();
        //this.idleState = 'Started.';
        this.timedOut = false;
    }
    
    openModal(content) {
        //close if any previously opened model
        if (!this.modalService.hasOpenModals()) {
            this.modalReference = this.modalService.open(content, this.modalOptions);
            
        }
    }
    
    closeModal() {
        this.modalReference.close();
    }
    stay() {
        this.closeModal();
        this.reset();
    }

    logout() {
        this.closeModal();
        this.authenticationService.logout()
        this.router.navigate(['/login']);
    }
}
