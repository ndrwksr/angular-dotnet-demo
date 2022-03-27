import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordsCreatorComponent } from './records/records-creator/records-creator.component';
import { RecordsModifierComponent } from './records/records-modifier/records-modifier.component';
import { RecordsSelectorComponent } from './records/records-selector/records-selector.component';
import { RecordsTableComponent } from './records/records-table/records-table.component';

const routes: Routes = [
  { path: '', component: RecordsTableComponent },
  { path: 'create', component: RecordsCreatorComponent },
  {
    path: 'modify',
    component: RecordsSelectorComponent,
    children: [{ path: ':id', component: RecordsModifierComponent }],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
