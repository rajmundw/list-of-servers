import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {ErrorModel, Server} from 'los-types-lib';
import { Store } from '@ngrx/store';
import {
  LoadServersAction,
  serversSelector,
  ChangeServerStatusAction,
  errorSelector, LoadServerAction
} from 'los-store-lib';
import { tap, map, pairwise, filter, takeWhile } from 'rxjs/operators';
import { Status } from 'los-types-lib';
import {ServiceStatus} from "los-store-lib";
import {LosMainSectionService} from "./los-filter-servers.service";

@Component({
  selector: 'los-main-section',
  templateUrl: './los-main-section.component.html',
  styleUrls: ['./los-main-section.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LosMainSectionComponent implements OnInit, OnDestroy {

  private isAlive: boolean = true;

  availableStatuses: Array<string> = [];
  filterServersValue: string = null;
  displayedColumns: Array<string> = ['name', 'status', 'changeStatus'];

  listOfServers$: Observable<Array<Server>> = this.store.select(serversSelector).pipe(
    pairwise(),
    tap(([previousState, currentState]) => this.losMainSectionService.serverStatusHandler(previousState, currentState)),
    map(([previousState, currentState]) => currentState)
  );
  errorHandler$: Observable<string> = this.store.select(errorSelector);

  constructor(private store: Store<ServiceStatus>,
              private losMainSectionService: LosMainSectionService) { }

  ngOnInit() {
    this.store.dispatch(LoadServersAction());
    this.availableStatuses = Object.keys(Status);
    this.errorHandler$.pipe(
        takeWhile(_ => this.isAlive),
        filter( error => !!error),
        tap(error  => this.losMainSectionService.openSnackBar(error)),
    ).subscribe();
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  changeServerStatus(status: string, id: number): void {
    this.store.dispatch(ChangeServerStatusAction({status, id}));
  }
}
