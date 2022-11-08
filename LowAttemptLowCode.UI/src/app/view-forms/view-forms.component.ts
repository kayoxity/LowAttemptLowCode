import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetAllModelsResponse } from '../.Models/Response/GetAllModelsResponse';

@Component({
  selector: 'app-view-forms',
  templateUrl: './view-forms.component.html',
  styleUrls: ['./view-forms.component.scss']
})
export class ViewFormsComponent implements OnInit {
  getAllModelsResponse:GetAllModelsResponse;

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllModelsResponse = {
      Error: "",
      Data: []
    }

    let url = this.baseUrl + '/api/Model/GetAllModels';
    this.http.get<GetAllModelsResponse>(url).subscribe({
      next: (response) => {
        this.getAllModelsResponse = response;
      },
      error: (error) => console.log(error)
    });
  }

  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = environment.angularBaseUrl + 'forms/' + val + '/fill';
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
