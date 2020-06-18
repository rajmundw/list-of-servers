import { Action } from '@ngrx/store';
import { httpCatchError } from 'los-api-lib';
import { Observable, OperatorFunction } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export function switchMapAction<S, T>(
  observableWithParams: (params: S) => Observable<T>,
  successActionClass: { new(...args: any[]): Action; },
  failureActionClass: { new(...args: any[]): Action; }
): OperatorFunction<S, Action> {
  return (source$: Observable<S>): Observable<Action> => source$.pipe(
    switchMap(params => observableWithParams(params).pipe(
      map((...resp) => new successActionClass(...resp) as Action),
      httpCatchError((...err) => new failureActionClass(...err) as Action)
    ))
  );
}


export function switchMapActionType<S, T>(
  observableWithParams: (params: S) => Observable<T>,
  successActionType: (res) => any,
  failureActionType: (err) => any
): OperatorFunction<S, any> {
  return (source$: Observable<S>): Observable<Action> => source$.pipe(
    switchMap(params => observableWithParams(params).pipe(
      map(successActionType),
      httpCatchError(failureActionType)
    ))
  );
}
