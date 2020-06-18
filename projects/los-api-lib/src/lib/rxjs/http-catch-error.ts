import { Action } from '@ngrx/store';
import { analyzeError, ErrorModel } from 'los-types-lib';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function httpCatchError<A extends Action>(selector: (err: ErrorModel[]) => A): OperatorFunction<any, A> {
  return (source$: Observable<any>) => source$.pipe(
    catchError(err => of(selector(analyzeError(err))))
  );
}
