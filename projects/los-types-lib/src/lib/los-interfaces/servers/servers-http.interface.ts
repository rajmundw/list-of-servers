import { Observable } from 'rxjs';
import { Server } from './servers.interface';

export interface IServersHttp {
  loadServers$(): Observable<Array<Server>>;
  loadServer$(id: number): Observable<Server>;
  turnOffServer$(id: number): Observable<Server>;
  turnOnServer$(id: number): Observable<Server>;
  rebootServer$(id: number): Observable<Server>;
}
