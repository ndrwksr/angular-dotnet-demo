import { EventEmitter, Component, OnInit, Output, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { RecordModel } from '../records.models';

@Component({
  selector: 'angular-dotnet-demo-records-form',
  templateUrl: './records-form.component.html',
  styleUrls: ['./records-form.component.scss'],
})
export class RecordsFormComponent implements OnInit {
  form?: FormGroup;

  @Input() title = '';
  @Input() initialValue?: RecordModel;
  @Input() clearOnSubmit?: '';
  @Output() submitForm: EventEmitter<Omit<RecordModel, 'id'>> =
    new EventEmitter();

  constructor(private readonly formBuilder: FormBuilder) {}

  submit(form: FormGroup, directive: FormGroupDirective) {
    this.submitForm.emit(form.value);

    const shouldClearOnSubmit = this.clearOnSubmit === undefined;
    if (shouldClearOnSubmit) return;
    form.reset();
    directive.resetForm();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [this.initialValue?.title ?? null, [Validators.required]],
      author: [this.initialValue?.author ?? null, [Validators.required]],
      published: [
        this.initialValue?.published ?? Date.now(),
        [Validators.required],
      ],
      copiesSold: [
        this.initialValue?.copiesSold ?? null,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
  }
}
