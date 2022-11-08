import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GetAllResponsesByModelIdResponse } from '../.Models/Response/GetAllResponsesByModelIdResponse'
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-form-responses',
  templateUrl: './form-responses.component.html',
  styleUrls: ['./form-responses.component.scss']
})
export class FormResponsesComponent implements OnInit {

  response:GetAllResponsesByModelIdResponse;

  format = 'dd/MM/yyyy';
  locale = 'en-US';

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.response = {
      Data: [],
      Error: ""
    }

    let url = this.baseUrl + '/api/Response/GetAllResponsesByModelId?modelid=' + this.route.snapshot.params['id'];
    this.http.get<GetAllResponsesByModelIdResponse>(url).subscribe({
      next: (response) => {
        this.response = response;
      },
      error: (error) => console.log(error)
    });
  }

  formatDate(DateCreated){
    return formatDate(DateCreated, this.format, this.locale)
  }

}
