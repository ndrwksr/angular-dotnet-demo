import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsModifierComponent } from './records-modifier.component';
import { RecordsFormModule } from '../records-form/records-form.module';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [RecordsModifierComponent],
  imports: [CommonModule, RecordsFormModule, RouterModule, MatSnackBarModule],
})
export class RecordsModifierModule {}
