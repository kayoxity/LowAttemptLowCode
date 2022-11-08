import { Component, DoCheck, EventEmitter, Input,  OnChanges,  OnInit, Output  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { InputEntity, FormModel } from '../.Models/FormModel';
import { environment } from '../../environments/environment';
import { AddModelRequest } from '../.Models/Request/AddModelRequest';
import { UpdateModelRequest } from '../.Models/Request/UpdateModelRequest';
import { FormObjectEntity } from '../.Models/Response/GetModelResponse';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})

export class FormsComponent implements OnInit,OnChanges {
  @Input() formData: FormObjectEntity;
  @Output() editFormInputEventEmitter = new EventEmitter<number>();
  @Output() addFormInputEventEmitter = new EventEmitter<{ inputEntity: InputEntity, formName: string, author: string }>();

  dynamicForm: FormGroup = this.fb.group({});
  baseUrl = environment.baseUrl;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //console.log(this.dynamicForm);
  }

  ngOnChanges(): void {
    this.createDynamicForm();
  }

  createDynamicForm() {
    for (let element of this.formData.Model.inputs) {
      let validators = [];
      for (let [key, value] of Object.entries(element.validators)) {
        switch (key) {
          case 'required':
            if(value == true)
              validators.push(Validators.required);
            break;
          case 'minlength':
            validators.push(Validators.minLength(value));
            break;
          case 'maxlength':
            validators.push(Validators.maxLength(value));
            break;
          case 'minBoxesChecked':
            validators.push(Validators.minLength(value));
            break;
          case 'maxBoxesChecked':
            validators.push(Validators.maxLength(value));
            break;
        }
      }

      this.dynamicForm.addControl(element.name, this.fb.control(element.initialValue, validators));
      this.dynamicForm.setControl(element.name, this.fb.control(element.initialValue, validators));
    }
    this.dynamicForm.addControl("formName", this.fb.control(this.formData.ModelName, Validators.required));
    this.dynamicForm.addControl("author", this.fb.control(this.formData.Author, Validators.required));

    this.dynamicForm.setControl("formName", this.fb.control(this.formData.ModelName, Validators.required));
    this.dynamicForm.setControl("author", this.fb.control(this.formData.Author, Validators.required));
  }

  saveForm() {
    if(this.route.snapshot.routeConfig.path.endsWith('edit')) {
      let url = this.baseUrl + '/api/Model/UpdateModel';

      let updateModelRequest:UpdateModelRequest = {
        Id: this.route.snapshot.params['id'],
        Author: this.dynamicForm.value["author"],
        ModelName: this.dynamicForm.value["formName"],
        Model: this.formData.Model
      }

      this.http.post(url, updateModelRequest).subscribe({
        next: (response) => {
          //console.log(response);
        },
        error: (error) => console.log(error)
      });
    } 
    else {
      let url = this.baseUrl + '/api/Model/AddModel';

      let addModelRequest:AddModelRequest = {
        Author: this.dynamicForm.value["author"],
        ModelName: this.dynamicForm.value["formName"],
        Model: this.formData.Model
      }

      this.http.post(url, addModelRequest).subscribe({
        next: (response) => {
          //console.log(response);
        },
        error: (error) => console.log(error)
      });
    }
  }

  editFormInput(order: number) {
    this.editFormInputEventEmitter.emit(order);
  }

  addFormInput() {
    var formInputData:InputEntity = {
      label: "Label",
      name: "name" + (this.formData.Model.inputs.length+1),
      type: "text",
      size: 1,
      placeholder: "",
      order: this.formData.Model.inputs.length,
      validators: { 
        required: false
      }
    };
    let customInputData = {
      inputEntity: formInputData,
      formName: this.dynamicForm.value["formName"],
      author: this.dynamicForm.value["author"]
    }
    this.addFormInputEventEmitter.emit(customInputData);
    this.editFormInputEventEmitter.emit(formInputData.order);
    this.createDynamicForm();
  }

}
