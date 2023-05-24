import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CohortService {
  cohortUrl = "http://localhost:8081/api/cohorts";
  constructor(private http: HttpClient) {

  }

  public getCohorts() {

    return this.http.get<any>(this.cohortUrl);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  public registerCohort( registerForm: FormGroup) {
    console.warn('FormgroupData', registerForm.value);

    const formData = new FormData();
    // @ts-ignore
    formData.append('cohortName', registerForm.get('cohortName').value);
    // @ts-ignore
    formData.append('description', registerForm.get('description').value);
    // @ts-ignore
    formData.append('acronym', registerForm.get('acronym').value);
    // @ts-ignore
    formData.append('targetEnrollment', registerForm.get('targetEnrollment').value);
    // @ts-ignore
    formData.append('totalEnrollment', registerForm.get('totalEnrollment').value);
    // @ts-ignore
    formData.append('website', registerForm.get('website').value);
    // @ts-ignore
    //formData.append('provider', registerForm.get('provider').value);
    // @ts-ignore
    formData.append('license', registerForm.get('license').value);
    // @ts-ignore
    //formData.append('contacts', registerForm.get('contacts').value);
    // @ts-ignore
   // formData.append('startDate', registerForm.get('startDate').value);
    // @ts-ignore
    //formData.append('endDate', registerForm.get('endDate').value);
    // @ts-ignore
    //formData.append('territories', registerForm.get('territories').value);
    console.log('formData ',formData.get('cohortName'));
    const object = {};
    // @ts-ignore
    formData.forEach((value, key) => object[key] = value);

    console.log('formData json str',JSON.stringify(object));
    this.http.post<any>("http://localhost:8081/api/cohorts",
      JSON.stringify(object), this.httpOptions).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
