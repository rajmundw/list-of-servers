import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LosMainSectionComponent } from './los-main-section/los-main-section.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LosFilterServersPipe } from './los-main-section/los-filter-servers.pipe';
import { LosFilterStatusesPipe } from './los-main-section/los-filter-statuses.pipe';
import {MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {LosMainSectionService} from './los-main-section/los-filter-servers.service';
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  declarations: [
    LosMainSectionComponent,
    LosFilterServersPipe,
    LosFilterStatusesPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule
  ],
  providers: [LosMainSectionService],
  exports: [LosMainSectionComponent]
})
export class LosRootModule { }
