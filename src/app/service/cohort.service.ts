import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CohortService {

  dataDictionary: any[];

  cohortUrl = "http://localhost:8080/api/cohorts";

  constructor(private http: HttpClient) {

  }

  public getCohorts() {

    return this.http.get<any>(this.cohortUrl);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  public registerCohort1(cohort: any): Observable<any> {
    return this.http.post<any>("http://localhost:8080/api/cohorts",
      cohort, this.httpOptions);
  }


  public getCohort(accession: string): Observable<any> {
    const cohortUrl = `http://localhost:8080/api/cohorts/${accession}`;
    return this.http.get(cohortUrl);
  }

  public postFile(fileToUpload: File): Observable<any> {
    let uploadHeaders = new Headers();
    const endpoint = 'http://localhost:5000/harmonise';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData);
    // .post(endpoint, formData, { headers: uploadHeaders })
    // .map(() => { return true; })
    // .catch((e) => this.handleError(e));
  }

  public saveDictionary(accession: string, fields: any[]): Observable<any> {
    accession = "BSC0000001";
    const endpoint = `http://localhost:8080/api/cohorts/${accession}/fields`;
    return this.http.put(endpoint, fields);
  }
}
