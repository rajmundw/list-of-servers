import {Injectable} from '@angular/core';
import {ChangeServerStatusAction, LoadServerAction} from "los-store-lib";
import {RebooteServers, Status} from "los-types-lib";
import {timer} from "rxjs";
import {tap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ServiceStatus} from "los-store-lib";

@Injectable()
export class LosMainSectionService {
    private rebooteServers: Array<RebooteServers> = [];

    constructor(private store: Store<ServiceStatus>,
                private snackBar: MatSnackBar) {}

    serverStatusHandler(previousState, currentState): void {
        if (previousState) {
            currentState.forEach((element, index) => {
                if (element.status === Status.REBOOTING && previousState[index].status !== Status.REBOOTING) {
                    const rebooteTimer = {
                        timer: timer(1000, 1000).pipe(
                            tap( _ => this.pingingServer(element.id))
                        ).subscribe(),
                        id: element.id
                    };
                    this.rebooteServers.push(rebooteTimer);
                }

                if (element.status !== Status.REBOOTING && previousState[index].status === Status.REBOOTING) {
                    this.rebooteServers.find(rebooteTimer => rebooteTimer.id === element.id).timer.unsubscribe();
                    this.rebooteServers = this.rebooteServers.filter(rebooteTimer => rebooteTimer.id !== element.id);
                }
                if (element.status !== previousState[index].status) {
                    this.openSnackBar(`${element.name} changed status to ${element.status}`);
                }
            });
        } else {
            currentState.forEach((element, index) => {
                if (element.status === Status.REBOOTING) {
                    const rebooteTimer = {
                        timer: timer(1000, 1000).pipe(
                            tap( _ => this.pingingServer(element.id))
                        ).subscribe(),
                        id: element.id
                    };
                    this.rebooteServers.push(rebooteTimer);
                }
            });
        }
    }
    private pingingServer(id: number): void {
        this.store.dispatch(LoadServerAction({id}));
    }

    openSnackBar(message: string) {
        this.snackBar.open(message, 'close', {
            duration: 2500,
        });
    }
}
