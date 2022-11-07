import { Component, DoCheck, EventEmitter, Input,  OnInit, Output  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormModel } from '../Models/FormModel';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})

export class FormsComponent implements OnInit,DoCheck {
  @Input() modelData: FormModel;
  @Output() editFormInputAddedEventEmitter = new EventEmitter<string>();

  dynamicForm: FormGroup = this.fb.group({});

  baseUrl = environment.baseUrl;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.createDynamicForm();
  }

  createDynamicForm() {

    this.modelData.controls.forEach(element => {
      this.dynamicForm.addControl(element.name, this.fb.control(element.value));
    });
  }

  onSubmit() {
    // console.log(this.dynamicForm);
  }

  editFormInput(inputName: string) {
    this.editFormInputAddedEventEmitter.emit(inputName);
  }

}
