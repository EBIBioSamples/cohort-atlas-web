import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {PageModel} from "../models/page-model";
import {EmbeddedField, Field} from "../models/field";

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  cohortAtlasApi = environment.cohort_atlas_api;

  constructor(private http: HttpClient) {
  }

  public getFields(searchText: string = "", filterQueryParams: string = "", page: number = 0): Observable<PageModel<EmbeddedField>> {
    const searchUrl: string = this.cohortAtlasApi + '/fields'.concat("?")
      .concat("text=").concat(searchText)
      .concat("&").concat(filterQueryParams)
      .concat("&").concat("page=").concat(page.toString());
    return this.http.get<PageModel<EmbeddedField>>(searchUrl).pipe(
      map((fieldPageModel: PageModel<EmbeddedField>) => {
        return fieldPageModel;
      })
    );
  }
}
