import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { RecordModel } from '../records.models';
import { RecordsService } from '../records.service';

@Component({
  selector: 'angular-dotnet-demo-records-selector',
  templateUrl: './records-selector.component.html',
})
export class RecordsSelectorComponent implements OnInit, OnDestroy {
  select = new FormControl();

  records?: RecordModel[];
  recordsSub?: Subscription;

  selectedRecord?: RecordModel;
  selectedRecordSub?: Subscription;

  filteredOptions?: Observable<RecordModel[]>;

  constructor(
    private readonly recordsService: RecordsService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.recordsSub = this.recordsService.records.subscribe((updated) => {
      this.records = updated;
    });
    this.selectedRecordSub = this.recordsService.selectedRecord.subscribe(
      (updated) => {
        this.selectedRecord = updated;
      }
    );
    this.filteredOptions = this.select.valueChanges.pipe(
      map((value: RecordModel) => this._filter(value))
    );
  }

  private _filter(value: string | RecordModel): RecordModel[] {
    if (!this.records) throw new Error('_filter called before options was set');

    const title = typeof value === 'string' ? value : value.title ?? '';
    console.log({ value, title });
    return this.records.filter((option) => {
      console.log({ option, title });
      return option.title.toLowerCase().includes(title.toLowerCase());
    });
  }

  getOptionText(value: RecordModel | null): string {
    return value?.title || '';
  }

  optionWasSelected({ value }: { value: RecordModel }) {
    this.router.navigate(['/modify/' + value.id]);
  }

  ngOnDestroy() {
    this.recordsSub?.unsubscribe();
    this.selectedRecordSub?.unsubscribe();
  }
}
