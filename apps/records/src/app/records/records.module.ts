import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RecordsService } from './records.service';
import { RecordsTableModule } from './records-table/records-table.module';
import { RecordsCreatorModule } from './records-creator/records-creator.module';
import { RecordsSelectorModule } from './records-selector/records-selector.module';
import { RecordsModifierModule } from './records-modifier/records-modifier.module';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [RecordsService],
  exports: [
    RecordsTableModule,
    RecordsCreatorModule,
    RecordsSelectorModule,
    RecordsModifierModule,
  ]
})
export class RecordsModule {}
