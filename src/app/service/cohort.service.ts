import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Cohort, CohortList, DataTypes} from "../models/cohort";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CohortService {
  cohortAtlasApi = environment.cohort_atlas_api;
  harmonizationApi = environment.harmonization_api;

  dataDictionary: any[];


  constructor(private http: HttpClient) {

  }

  public getCohorts1(): Observable<CohortList> {
    return this.http.get<CohortList>(this.cohortAtlasApi + '/cohorts');
  }

  public getCohorts(): Observable<Cohort[]> {
    return this.http.get<CohortList>(this.cohortAtlasApi + '/cohorts').pipe(
      map((cohortList: CohortList) => cohortList._embedded.cohorts.map(cohort => {
        if (!cohort.dataTypes) {
          cohort.dataTypes = new DataTypes();
        }
        if (!cohort.acronym) {
          cohort.acronym = cohort.accession;
        }
        return cohort
      }))
    );
  }

  public searchCohorts(filterQueryParams: string) {
    const filterUrl: string = this.cohortAtlasApi + '/cohorts'.concat("?").concat(filterQueryParams);
    console.log("Filter URL:" + filterUrl);
    return this.http.get<CohortList>(filterUrl).pipe(
      map((cohortList: CohortList) => {
        let cohorts = cohortList._embedded ? cohortList._embedded.cohorts : [];
        cohorts.map(cohort => {
          if (!cohort.dataTypes) {
            cohort.dataTypes = new DataTypes();
          }
          if (!cohort.acronym) {
            cohort.acronym = cohort.accession;
          }
          return cohort
        })
        return cohorts;
      })
    );
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };


  public getCohort(accession: string): Observable<Cohort> {
    const cohortUrl = this.cohortAtlasApi + '/cohorts/' + accession;
    return this.http.get<Cohort>(cohortUrl).pipe(
      map((cohort: Cohort) => {
        if (!cohort.dataTypes) {
          cohort.dataTypes = new DataTypes();
        }
        if (!cohort.acronym) {
          cohort.acronym = cohort.accession;
        }
        return cohort
      })
    );
  }

  public registerCohort1(cohort: any): Observable<any> {
    return this.http.post<any>(this.cohortAtlasApi + '/cohorts', cohort, this.httpOptions);
  }

  public saveCohortRelationships(accession: string, relationships: any) {
    return this.http.put<any>(this.cohortAtlasApi + '/cohorts/' + accession + '/relationships', relationships, this.httpOptions);
  }

  public saveSurveyData(accession: string, survey: any) {
    return this.http.put<any>(this.cohortAtlasApi + '/cohorts/' + accession + '/survey', survey, this.httpOptions);
  }

  public postFile(fileToUpload: File): Observable<any> {
    let uploadHeaders = new Headers();
    const endpoint = this.harmonizationApi + '/harmonise';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData);
    // .post(endpoint, formData, { headers: uploadHeaders })
    // .map(() => { return true; })
    // .catch((e) => this.handleError(e));
  }

  public uploadDictionaryFile(accession: string, fileToUpload: File): Observable<any> {
    let uploadHeaders = new Headers();
    const endpoint = this.cohortAtlasApi + '/cohorts/' + accession + '/dictionary';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData);
    // .post(endpoint, formData, { headers: uploadHeaders })
    // .map(() => { return true; })
    // .catch((e) => this.handleError(e));
  }

  public saveDictionary(accession: string, fields: any[]): Observable<any> {
    accession = "BSC0000001";
    const endpoint = `${this.cohortAtlasApi}/cohorts/${accession}/fields`;
    return this.http.put(endpoint, fields);
  }
}
