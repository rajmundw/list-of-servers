import { Injectable } from '@angular/core';
import { Server, IServersHttp } from 'los-types-lib';
import { Observable } from 'rxjs';
import { LosHttpClientService, endpoints } from 'los-common-lib';




@Injectable({ providedIn: 'root' })
export class ServersHttpService implements IServersHttp {
  constructor( private http: LosHttpClientService ) { }
  loadServers$ = (): Observable<Array<Server>> => this.http.get(endpoints.servers.loadServers);
  loadServer$ = (id: number): Observable<Server> => this.http.get(endpoints.servers.loadServer(id));
  turnOffServer$ = (id: number): Observable<Server> => this.http.put(endpoints.servers.turnOffServer(id));
  turnOnServer$ = (id: number): Observable<Server> => this.http.put(endpoints.servers.turnOnServer(id));
  rebootServer$ = (id: number): Observable<Server> => this.http.put(endpoints.servers.rebootServer(id));
}
