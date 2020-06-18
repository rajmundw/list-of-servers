import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import {ErrorModel, Server} from "los-types-lib";
import {ServiceStatus} from "./servers.state";

const settingsFeatureSelector: MemoizedSelector<ServiceStatus, ServiceStatus> = createFeatureSelector<ServiceStatus>('main');
export const serversSelector: MemoizedSelector<ServiceStatus, Array<Server>> = createSelector(settingsFeatureSelector,
    ({ servers }) => {
        return servers;
    });
export const errorSelector: MemoizedSelector<ServiceStatus, string> = createSelector(settingsFeatureSelector,
    ({ error }) => {
        if (error === null) {
            return error;
        } else {
            return error && error.error && error.error.errorMessage ? error.error.errorMessage : error.message;
        }
    });
