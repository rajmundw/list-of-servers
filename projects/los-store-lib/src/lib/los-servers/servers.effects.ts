import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMapActionType } from '../rxjs/switch-map-action';
import {
    LoadServersAction,
    LoadServersSuccessAction,
    LoadServersFailureAction,
    ChangeServerStatusAction,
    ChangeServerStatusSuccessAction,
    ChangeServerStatusFailureAction,
    LoadServerAction,
    LoadServerSuccessAction,
    LoadServerFailureAction
} from './servers.actions';
import { ServersHttpService } from 'los-api-lib';
import {Status} from 'los-types-lib';
import {ServiceStatus} from "./servers.state";

@Injectable()
export class ServersEffects {

  loadServers$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(LoadServersAction),
    switchMapActionType(
      _ => this.serversService.loadServers$(),
      servers => LoadServersSuccessAction( { servers } ),
      error => LoadServersFailureAction({ error })
    )
  ));

  loadServer$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(LoadServerAction),
    switchMapActionType(
      ({id}) => this.serversService.loadServer$(id),
      server => LoadServerSuccessAction({ server }),
      error => LoadServerFailureAction({ error })
    )
  ));

  changeServerStatus$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ChangeServerStatusAction),
    switchMapActionType(
      ({status, id}) => {
        switch (status) {
          case Status.OFFLINE:
            return this.serversService.turnOffServer$(id);
          case Status.ONLINE:
            return this.serversService.turnOnServer$(id);
          case Status.REBOOTING:
            return this.serversService.rebootServer$(id);
        }
      },
      server => ChangeServerStatusSuccessAction({ server }),
      error => ChangeServerStatusFailureAction({error})
    )
  ));

  constructor(
    private actions$: Actions,
    private store: Store<ServiceStatus>,
    private serversService: ServersHttpService
  ) { }
}
