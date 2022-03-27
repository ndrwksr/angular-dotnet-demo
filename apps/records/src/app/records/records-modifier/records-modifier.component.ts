import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecordModel } from '../records.models';
import { RecordsService } from '../records.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'angular-dotnet-demo-records-modifier',
  templateUrl: './records-modifier.component.html'
})
export class RecordsModifierComponent implements OnInit, OnDestroy {
  selectedRecord?: RecordModel;
  selectedRecordSub?: Subscription;

  title?: string = '';

  constructor(
    private readonly recordsService: RecordsService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.selectedRecordSub = this.recordsService.selectedRecord.subscribe(
      (updated) => {
        this.selectedRecord = updated;
        this.updateTitle();
      }
    );
  }

  updateTitle() {
    if (this.selectedRecord) this.title = 'Update ' + this.selectedRecord.title;
  }

  async updateRecord(record: Omit<RecordModel, 'id'>) {
    if (!this.selectedRecord)
      throw new Error(
        'updateRecord was called while selectedRecord was not set'
      );

    const updatedRecord = await this.recordsService.updateOne(
      this.selectedRecord.id,
      record
    );
    const snackBarMessage = 'Updated record: ' + updatedRecord.title;
    this.snackBar.open(snackBarMessage, undefined, { duration: 3000 });
  }

  ngOnDestroy() {
    this.selectedRecordSub?.unsubscribe();
  }
}
