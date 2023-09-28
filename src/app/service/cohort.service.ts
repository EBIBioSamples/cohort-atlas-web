import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Cohort, DataTypes, EmbeddedCohort} from "../models/cohort";
import {PageModel} from "../models/page-model";

@Injectable({
  providedIn: 'root'
})
export class CohortService {
  cohortAtlasApi = environment.cohort_atlas_api;
  harmonizationApi = environment.harmonization_api;
  dataDictionary: any[];

  constructor(private http: HttpClient) {

  }

  public searchCohorts(searchText: string = "", filterQueryParams: string = "", page: number = 0): Observable<PageModel<EmbeddedCohort>> {
    const filterUrl: string = this.cohortAtlasApi + '/cohorts'.concat("?")
      .concat("text=").concat(searchText)
      .concat("&").concat(filterQueryParams)
      .concat("&").concat("page=").concat(page.toString());
    console.log("Filter URL:" + filterUrl);
    return this.http.get<PageModel<EmbeddedCohort>>(filterUrl).pipe(
      map((cohortPage: PageModel<EmbeddedCohort>) => {
        let cohorts = cohortPage._embedded ? cohortPage._embedded.cohorts : [];
        cohortPage._embedded.cohorts = cohorts.map(cohort => {
          if (!cohort.dataTypes) {
            cohort.dataTypes = new DataTypes();
          }
          if (!cohort.acronym) {
            cohort.acronym = cohort.accession;
          }
          cohort.enrollmentPeriod = cohort.startDate + ' - ' + cohort.endDate;
          return cohort
        })
        return cohortPage;
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
        cohort.enrollmentPeriod = cohort.startDate + ' - ' + cohort.endDate;
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
