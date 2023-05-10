import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CohortService {

  constructor(private http: HttpClient) {

  }

  public getCohorts() {
    const cohortUrl = "http://localhost:8080/api/cohorts";
    return this.http.get<any>(cohortUrl);
  }
}
