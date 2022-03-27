import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsTableComponent } from './records-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [RecordsTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  exports: [RecordsTableComponent],
})
export class RecordsTableModule {}
