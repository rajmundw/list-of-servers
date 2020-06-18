import {Subscription} from "rxjs";

export enum Status {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
    REBOOTING = 'REBOOTING'
}
export interface Server {
    id: number;
    name: string;
    status: Status.ONLINE | Status.OFFLINE | Status.REBOOTING;
}

export interface RebooteServers {
    id: number;
    timer: Subscription;
}

