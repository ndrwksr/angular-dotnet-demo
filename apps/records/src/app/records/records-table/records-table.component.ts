import { Component, OnInit } from '@angular/core';
import { RecordModel } from '../records.models';
import { RecordsService } from '../records.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'angular-dotnet-demo-records-table',
  templateUrl: './records-table.component.html',
  styleUrls: ['./records-table.component.scss'],
})
export class RecordsTableComponent implements OnInit {
  records: RecordModel[] | undefined;
  displayedColumns = [
    'id',
    'title',
    'author',
    'published',
    'copiesSold',
    'actions',
  ];
  private recordsSub?: Subscription;

  constructor(
    private readonly recordsService: RecordsService,
    private readonly snackBar: MatSnackBar,
    readonly router: Router,    
  ) {}

  ngOnInit() {
    this.recordsSub = this.recordsService.records.subscribe(
      (gotRecords) => (this.records = gotRecords)
    );
  }

  ngOnDestory() {
    this.recordsSub?.unsubscribe();
  }

  async deleteOne(record: RecordModel) {
    await this.recordsService.deleteOne(record.id);
    const snackBarMessage = 'Deleted record: ' + record.title;
    this.snackBar.open(snackBarMessage, undefined, { duration: 3000 });
  }
}
