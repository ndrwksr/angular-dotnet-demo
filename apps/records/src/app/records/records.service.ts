import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, startWith, firstValueFrom, BehaviorSubject } from 'rxjs';

import { RecordModel } from './records.models';
import { environment } from '../../environments/environment';
import { nanoid } from 'nanoid';
import { NavigationEnd, Router } from '@angular/router';

@Injectable()
export class RecordsService {
  public readonly records = new BehaviorSubject<RecordModel[] | undefined>(
    undefined
  );
  private readonly selectedId = new BehaviorSubject<string | undefined>(
    undefined
  );
  public readonly selectedRecord = new BehaviorSubject<RecordModel | undefined>(
    undefined
  );

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {
    this.getAll();
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e) => this.selectedIdFromUrl((e as NavigationEnd).url)),
        startWith(this.selectedIdFromUrl(this.router.url))
      )
      .subscribe((newSelectedId) => {
        this.selectedId.next(newSelectedId);
      });

    this.records.subscribe((updatedRecords) => {
      this.updateSelectedRecord(updatedRecords, undefined);
    });
    this.selectedId.subscribe((updatedSelectedId) => {
      this.updateSelectedRecord(undefined, updatedSelectedId);
    });
  }

  private updateSelectedRecord(
    updatedRecords: RecordModel[] | undefined,
    updatedSelectedId: string | undefined
  ) {
    const records = updatedRecords ?? this.records.value;
    const selectedId = updatedSelectedId ?? this.selectedId.value;
    const idPredicate = ({ id }: RecordModel) => id === selectedId;
    this.selectedRecord.next(records?.find(idPredicate));
  }

  private selectedIdFromUrl(url: string | undefined): string | undefined {
    if (!url) return undefined;

    const urlComponents = url.split('/');
    const lastUrlComponent = urlComponents[urlComponents.length - 1];
    return lastUrlComponent === 'modify' ? undefined : lastUrlComponent;
  }

  public createOne(
    recordWithoutId: Omit<RecordModel, 'id'>
  ): Promise<RecordModel> {
    const id = nanoid();
    const record: RecordModel = { id, ...recordWithoutId };
    const postPromise = firstValueFrom(
      this.httpClient.post<RecordModel>(environment.api + '/records', record)
    );
    postPromise.then(() => this.getAll());
    return postPromise;
  }

  private getAll(): void {
    const next = (records: RecordModel[]) => this.records.next(records);
    this.httpClient
      .get<RecordModel[]>(environment.api + '/records')
      .subscribe(next);
  }

  public updateOne(
    id: string,
    record: Omit<RecordModel, 'id'>
  ): Promise<RecordModel> {
    const putPromise = firstValueFrom(
      this.httpClient.put<RecordModel>(
        `${environment.api}/records/${id}`,
        record
      )
    );
    putPromise.then(() => this.getAll());
    return putPromise;
  }

  public deleteOne(id: string): Promise<void> {
    const deletePromise = firstValueFrom(
      this.httpClient.delete<RecordModel>(environment.api + '/records/' + id)
    );
    deletePromise.then(() => this.getAll());
    return deletePromise.then();
  }
}
