import { Component, DoCheck, EventEmitter, Input,  OnChanges,  OnInit, Output  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { InputEntity, FormModel } from '../.Models/FormModel';
import { environment } from '../../environments/environment';
import { AddModelRequest } from '../.Models/Request/AddModelRequest';
import { UpdateModelRequest } from '../.Models/Request/UpdateModelRequest';
import { FormObjectEntity } from '../.Models/Response/GetModelResponse';
import { AddModelResponse } from '../.Models/Response/AddModelResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})

export class FormsComponent implements OnInit,OnChanges {
  @Input() formData: FormObjectEntity;
  @Output() editFormInputEventEmitter = new EventEmitter<number>();
  @Output() deleteFormInputEventEmitter = new EventEmitter<number>();
  @Output() addFormInputEventEmitter = new EventEmitter<{ inputEntity: InputEntity, formName: string, author: string }>();

  dynamicForm: FormGroup = this.fb.group({});
  baseUrl = environment.baseUrl;
  downloadJsonHref: any;
  file:any;
  isEditPage:boolean;

  constructor(private fb: FormBuilder, private http: HttpClient, private activatedRoute: ActivatedRoute, private route: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    //console.log(this.dynamicForm);
    this.isEditPage = !this.activatedRoute.snapshot.routeConfig.path.endsWith('edit');
  }

  ngOnChanges(): void {
    this.createDynamicForm();
    this.prepareDownloadFile();
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
            validators.push(Validators.minLength(+value));
            break;
          case 'maxlength':
            validators.push(Validators.maxLength(+value));
            break;
          case 'minBoxesChecked':
            validators.push(Validators.minLength(+value));
            break;
          case 'maxBoxesChecked':
            validators.push(Validators.maxLength(+value));
            break;
        }
      }
      if(element.type == "email") {
        validators.push(Validators.email);
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
    this.prepareDownloadFile();

    if(this.activatedRoute.snapshot.routeConfig.path.endsWith('edit')) {
      let url = this.baseUrl + '/api/Model/UpdateModel';

      let updateModelRequest:UpdateModelRequest = {
        Id: this.activatedRoute.snapshot.params['id'],
        Author: this.dynamicForm.value["author"],
        ModelName: this.dynamicForm.value["formName"],
        Model: this.formData.Model,
        ResponseCount: this.formData.ResponseCount
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
        Model: this.formData.Model,
        ResponseCount: this.formData.ResponseCount
      }

      this.http.post<AddModelResponse>(url, addModelRequest).subscribe({
        next: (response) => {
          this.route.navigate(['forms',response.Data,'edit']);
        },
        error: (error) => console.log("Error ocurred : ", error)
      });
    }
  }

  editFormInput(order: number) {
    this.editFormInputEventEmitter.emit(order);
  }

  addFormInput() {
    var formInputData:InputEntity = {
      label: "Label",
      name: "name" + crypto.randomUUID(),
      type: "text",
      size: 1,
      placeholder: "",
      order: this.formData.Model.inputs.length,
      validators: { 
        required: "false"
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

  deleteFormInput(order:number) {
    this.deleteFormInputEventEmitter.emit(order);
  }

  prepareDownloadFile() {
    var theJSON = JSON.stringify(this.formData);
    let blob = new Blob([theJSON], { type: 'text/json' });
    let url= window.URL.createObjectURL(blob);
    let uri:SafeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    this.downloadJsonHref = uri;
  }

  fileChanged(e) {
    this.file = e.target.files[0];
    let uploadedData;

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      uploadedData = fileReader.result;
      console.log(uploadedData);

      let data = {
        data: uploadedData
      };

      let url = this.baseUrl + '/api/Model/AddJsonModel';

      this.http.post<AddModelResponse>(url, data).subscribe({
        next: (response) => {
          this.route.navigate(['/forms', response.Data, 'edit']);
        },
        error: (error) => console.log("Error ocurred : ", error)
      });

    }

    fileReader.readAsText(this.file);
  }
}
