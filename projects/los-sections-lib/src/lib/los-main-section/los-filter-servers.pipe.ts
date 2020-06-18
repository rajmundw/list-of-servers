import { PipeTransform, Pipe } from '@angular/core';
import {Server} from "los-types-lib";


@Pipe({name: 'filterServers'})
export class LosFilterServersPipe implements PipeTransform {
  transform(listOfServers$: Array<Server>, filterServersValue: string): Array<Server> {

    return !!listOfServers$ && !!filterServersValue ? listOfServers$.filter(
      server => server.name.toUpperCase().indexOf(filterServersValue.toUpperCase()) > -1) : listOfServers$;
  }
}
