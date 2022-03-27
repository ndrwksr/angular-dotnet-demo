import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsCreatorComponent } from './records-creator.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RecordsFormModule } from '../records-form/records-form.module';

@NgModule({
  declarations: [RecordsCreatorComponent],
  imports: [CommonModule, RecordsFormModule, MatSnackBarModule],
})
export class RecordsCreatorModule {}
