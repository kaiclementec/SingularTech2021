import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterAgGridComponent } from './filter-ag-grid/filter-ag-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditDeleteComponent } from './ag-grid-render/edit-delete.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgSelectSimpleComponent } from './ng-select-simple/ng-select-simple.component';
import { MatTooltipModule } from '@angular/material/tooltip'



@NgModule({
  declarations: [FilterAgGridComponent, EditDeleteComponent, NgSelectSimpleComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDropdownModule,
    NgSelectModule,
    AgGridModule.withComponents([EditDeleteComponent]),
    MatTooltipModule,
  ],
  exports: [
    FilterAgGridComponent,
    NgSelectSimpleComponent
  ]
})
export class SharedModule { }
