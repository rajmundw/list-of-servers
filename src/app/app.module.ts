import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { LosStoreModule } from 'projects/los-store-lib/src/lib/los-store.module';
import { LosRootModule } from 'los-sections-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    LosRootModule,
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    LosStoreModule,
    BrowserAnimationsModule
  ],
exports: [
  RouterModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
