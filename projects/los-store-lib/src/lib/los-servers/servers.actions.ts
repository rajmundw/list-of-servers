import { createAction, props } from '@ngrx/store';
import { Server } from 'los-types-lib';

export const LoadServersAction = createAction('[LoadServers] Load Servers');
export const LoadServersSuccessAction = createAction('[LoadServers] Load Servers Success', props<{ servers: Array<Server>}>());
export const LoadServersFailureAction = createAction('[LoadServers] Load Servers Failure', props<{ error: Error }>());
export const ChangeServerStatusAction = createAction('[ChangeServerStatus] Change Server Status', props<{status: string, id: number}>());
export const ChangeServerStatusSuccessAction = createAction('[ChangeServerStatus] Change Server Status Success', props<{ server: Server}>());
export const ChangeServerStatusFailureAction = createAction('[ChangeServerStatus] Change Server Status Failure', props<{ error: Error }>());
export const LoadServerAction = createAction('[LoadServer] Load Server', props<{id: number}>());
export const LoadServerSuccessAction = createAction('[LoadServer] Load Server Success', props<{ server: Server}>());
export const LoadServerFailureAction = createAction('[LoadServer] Load Server Failure', props<{ error: Error }>());
