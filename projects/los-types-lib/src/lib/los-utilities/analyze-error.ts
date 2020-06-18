import { ErrorModel } from '../models/error.model';

export function analyzeError(err: any): ErrorModel[] {
  console.log('httpCatchFailure', err);
  return err;
}
