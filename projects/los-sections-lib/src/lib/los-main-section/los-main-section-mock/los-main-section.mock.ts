import {Pipe, PipeTransform} from "@angular/core";
import {ErrorModel, Server, Status} from "los-types-lib";

@Pipe({name: 'filterServers'})
export class MockFilterServersPipe implements PipeTransform {
    transform(listOfServers$: Array<Server>, filterServersValue: string): Array<Server> {
        return !!listOfServers$ && !!filterServersValue ? listOfServers$.filter(
            server => server.name.toUpperCase().indexOf(filterServersValue.toUpperCase()) > -1) : listOfServers$;
    }
}

@Pipe({name: 'filterStatuses'})
export class MockFilterStatusesPipe implements PipeTransform {
    transform(availableStatuses: Array<string>, selectedStatus: string): Array<string> {
        return availableStatuses;
    }
}
export class MockLosMainSectionService {
    rebooteServers: Array<any> = [];

    constructor() {}

    serverStatusHandler(previousState, currentState): void {
        if (previousState) {
            currentState.forEach((element, index) => {
                if (element.status === Status.REBOOTING && previousState[index].status !== Status.REBOOTING) {
                    const rebooteTimer = {id: element.id};
                    this.rebooteServers.push(rebooteTimer);
                }


                if (element.status !== Status.REBOOTING && previousState[index].status === Status.REBOOTING) {
                    this.rebooteServers = this.rebooteServers.filter(rebooteTimer => rebooteTimer.id !== element.id);
                }
                if (element.status !== previousState[index].status) {
                    this.openSnackBar();
                }

            });
        } else {
            currentState.forEach((element, index) => {
                if (element.status === Status.REBOOTING) {
                    const rebooteTimer = '';
                    this.rebooteServers.push(rebooteTimer);
                }
            });
        }
    }
    pingingServer(el) {

    }

    openSnackBar() {
    }
}
export const mockServers: Array<Server> = [
    {id: 1, name: 'US East (Virginia)', status: Status.ONLINE},
    {id: 2, name: 'US East (Ohio)', status: Status.ONLINE}
];
export const mockServersAfterChanged: Array<Server> = [
    {id: 1, name: 'US East (Virginia)', status: Status.ONLINE},
    {id: 2, name: 'US East (Ohio)', status: Status.ONLINE}
];
export const mockServersWithRebooteState: Array<Server> = [
    {id: 1, name: 'US East (Virginia)', status: Status.REBOOTING},
    {id: 2, name: 'US East (Ohio)', status: Status.REBOOTING}
];
export const mockError: ErrorModel = {
    type: 'mock',
    page: window.location,
    date: new Date(),
    message: 'message',
    statusCode: 500,
    error: {
        errorMessage: 'errorMessage'
    }
};
