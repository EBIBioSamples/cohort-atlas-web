import {Injectable} from '@angular/core';
import {FacetSummary, Facet} from "../models/facet";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FacetService {
  cohortAtlasApi = environment.cohort_atlas_api;

  constructor(private http: HttpClient) {
  }

  public getFacets(text: string, filters: []): Observable<Facet[]> {
    const filterUrl: string = this.cohortAtlasApi + '/facets';
    return this.http.get<Facet[]>(filterUrl);
  }

  public getOverallSummary(): Observable<FacetSummary> {
    const filterUrl: string = this.cohortAtlasApi + '/facets/summary';
    return this.http.get<FacetSummary>(filterUrl);
  }
}
