import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {PageModel} from "../models/PageModel";
import {EmbeddedField, Field} from "../models/Field";

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  cohortAtlasApi = environment.cohort_atlas_api;

  constructor(private http: HttpClient) {
  }

  public getFields(searchText: string = "", filterQueryParams: string = "", page: number = 0): Observable<PageModel<EmbeddedField>> {
    return this.http.get<PageModel<EmbeddedField>>(this.cohortAtlasApi + '/fields').pipe(
      map((fieldPageModel: PageModel<EmbeddedField>) => {
        return fieldPageModel;
      })
    );
  }
}
