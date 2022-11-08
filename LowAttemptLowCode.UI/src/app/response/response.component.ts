import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GetResponseByResponseIdResponse } from '../.Models/Response/GetResponseByResponseIdResponse'

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {

  response:GetResponseByResponseIdResponse;

  format = 'dd/MM/yyyy';
  locale = 'en-US';

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.response = {
      Data: {
        Id: "",
        Name: "",
        Responses: []
      },
      Error: ""
    }

    let url = this.baseUrl + '/api/Response/GetResponseByResponseId?responseid=' + this.route.snapshot.params['responseid'];
    this.http.get<GetResponseByResponseIdResponse>(url).subscribe({
      next: (response) => {
        this.response = response;
      },
      error: (error) => console.log(error)
    });
  }

}
