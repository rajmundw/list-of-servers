import { PipeTransform, Pipe } from '@angular/core';
import {Status} from 'los-types-lib';


@Pipe({name: 'filterStatuses'})
export class LosFilterStatusesPipe implements PipeTransform {
  transform(availableStatuses: Array<string>, selectedStatus: string): Array<string> {
    return availableStatuses.filter(
        availableStatus => selectedStatus === Status.OFFLINE ? availableStatus !== selectedStatus && availableStatus !== Status.REBOOTING : availableStatus !== selectedStatus );
  }
}
