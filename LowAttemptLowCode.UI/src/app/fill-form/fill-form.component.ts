import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormObjectEntity, GetModelResponse } from '../.Models/Response/GetModelResponse';
import { AddResponseRequest, ResponseSchema } from '../.Models/Request/AddResponseRequest';

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss']
})
export class FillFormComponent implements OnInit {
  formData: FormObjectEntity;
  baseUrl = environment.baseUrl;

  dynamicForm: FormGroup = this.fb.group({});

  constructor(private http: HttpClient, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formData = {
      Author: "",
      ModelName: "",
      Model: {
        inputs: []
      },
      ResponseCount: 0
    };

    let id = this.route.snapshot.params['id'];

    let url = this.baseUrl + '/api/Model/GetModelById?id=' + this.route.snapshot.params['id'];
    this.http.get<GetModelResponse>(url).subscribe({
      next: (response) => {
        this.formData = response.Data;
        this.createDynamicForm();
      },
      error: (error) => console.log(error)
    });
  }

  createDynamicForm() {
    for (let element of this.formData.Model.inputs) {
      let validators = [];
      for (let [key, value] of Object.entries(element.validators)) {
        switch (key) {
          case 'required':
            if(value == "true") 
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

    this.dynamicForm.addControl("Name", this.fb.control(null, Validators.required));
    this.dynamicForm.setControl("Name", this.fb.control(null, Validators.required));
  }

  submitResponse() {
    let url = this.baseUrl + '/api/Response/AddResponse';
    console.log(this.dynamicForm);

    let responses:ResponseSchema[] = [];

    for (let [key, value] of Object.entries(this.dynamicForm.controls)) {
      let response:ResponseSchema = {
        InputName: key,
        Value: value.value,
        Values: []
      }
      responses.push(response);
    }

    let responseData:AddResponseRequest = {
      ModelId: this.route.snapshot.params['id'],
      Name: this.dynamicForm.value.Name,
      Response: responses
    }

    this.http.post(url, responseData).subscribe({
      next: (response) => {
      },
      error: (error) => console.log(error)
    });
  }

}
