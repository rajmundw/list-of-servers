import { Action, createReducer, on } from '@ngrx/store';
import {
  LoadServersSuccessAction,
  ChangeServerStatusFailureAction,
  ChangeServerStatusSuccessAction,
  LoadServersFailureAction,
  LoadServerFailureAction,
  LoadServerSuccessAction } from './servers.actions';
import { ServiceStatus } from './servers.state';


const reducer = createReducer(
  new ServiceStatus(),
    on(LoadServersSuccessAction, (state, { servers }) => ({ ...state, servers })),
    on(ChangeServerStatusSuccessAction,
      (state, { server }) => ({ ...state, servers: [...state.servers.map(element => element.id === server.id ? server : element)]})),
    on(LoadServerSuccessAction,
      (state, { server }) => ({ ...state, servers: [...state.servers.map(element => element.id === server.id ? server : element)]})),
    on(ChangeServerStatusFailureAction,
    (state, { error }) => ({ ...state, error})),
    on(LoadServersFailureAction,
        (state, { error }) => ({ ...state, error})),
    on(LoadServerFailureAction,
        (state, { error }) => ({ ...state, error})),
);
export function serversReducer(state: ServiceStatus, action: Action) {
  return reducer(state, action);
}
