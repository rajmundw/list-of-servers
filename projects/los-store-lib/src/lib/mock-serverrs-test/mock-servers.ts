import {ServiceStatus} from "../los-servers/servers.state";
import {ErrorModel, Server, Status} from "los-types-lib";

export const mockServers: Array<Server> = [
    {id: 1, name: 'US East (Virginia)', status: Status.ONLINE},
    {id: 2, name: 'US East (Ohio)', status: Status.ONLINE}
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
export const mockErrorWithoutMessage: ErrorModel = {
    type: 'mock',
    page: window.location,
    date: new Date(),
    message: 'message',
    statusCode: 500,
    error: {
        errorMessage: ''
    }
};
export const mockStore: ServiceStatus  = {
    servers: mockServers,
    error: mockError
};
export const mockStoreWithoutMessage: ServiceStatus  = {
    servers: mockServers,
    error: mockErrorWithoutMessage
};
