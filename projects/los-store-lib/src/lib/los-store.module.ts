import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { serversReducer } from './los-servers/servers.reducer';
import { ServersEffects } from './los-servers/servers.effects';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({ main: serversReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 50
    }),
    EffectsModule.forRoot([
      ServersEffects
    ])
  ],
  exports: [StoreModule, EffectsModule],
})
export class LosStoreModule { }
