import { Component } from '@angular/core';
import { RecordsService } from '../records.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecordModel } from '../records.models';

@Component({
  selector: 'angular-dotnet-demo-records-creator',
  templateUrl: './records-creator.component.html',
})
export class RecordsCreatorComponent {
  constructor(
    private readonly recordsService: RecordsService,
    private readonly snackBar: MatSnackBar
  ) {}

  async createRecord(record: Omit<RecordModel, 'id'>) {
    const createdRecord = await this.recordsService.createOne(record);
    const snackBarMessage = 'Created new record: ' + createdRecord.title;
    this.snackBar.open(snackBarMessage, undefined, { duration: 3000 });
  }
}
