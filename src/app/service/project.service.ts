import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {PageModel} from "../models/PageModel";
import {EmbeddedProject, Project} from "../models/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  cohortAtlasApi = environment.cohort_atlas_api;

  constructor(private http: HttpClient) {
  }

  public getProjects(): Observable<Project[]> {
    return this.http.get<PageModel<EmbeddedProject>>(this.cohortAtlasApi + '/projects').pipe(
      map((pageModel: PageModel<EmbeddedProject>) => {
        console.log(pageModel);
        return pageModel._embedded.projects;
      })
    );
  }
}
