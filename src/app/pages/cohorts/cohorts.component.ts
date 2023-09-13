import {Component, OnInit} from '@angular/core';
import {CohortService} from "../../service/cohort.service";
import {Cohort, CohortTableBuilder} from "../../models/cohort";
import {FacetService} from "../../service/facet.service";
import {FacetSummary, Filter} from "../../models/facet";
import {Field, FieldTableBuilder} from "../../models/Field";
import {Project, ProjectTableBuilder} from "../../models/project";
import {FieldService} from "../../service/field.service";
import {ProjectService} from "../../service/project.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-cohorts',
  templateUrl: './cohorts.component.html',
  styleUrls: ['./cohorts.component.scss']
})
export class CohortsComponent implements OnInit {
  projects: Project[];
  cohorts: Cohort[];
  fields: Field[];
  projectsTableBuilder: ProjectTableBuilder;
  cohortsTableBuilder: CohortTableBuilder;
  fieldTableBuilder: FieldTableBuilder;
  facetSummary: FacetSummary;

  filters: Filter[] = [];
  searchText: string;

  constructor(private cohortService: CohortService, private facetService: FacetService,
              private fieldService: FieldService, private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.cohortService.getCohorts().subscribe(data => {
      this.cohorts = data;
      this.cohortsTableBuilder = new CohortTableBuilder(this.cohorts);
    });

    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
      this.projectsTableBuilder = new ProjectTableBuilder(this.projects);
    });

    this.fieldService.getFields().subscribe(data => {
      this.fields = data;
      this.fieldTableBuilder = new FieldTableBuilder(this.fields);
    });

    this.facetService.getOverallSummary().subscribe(data => {
      this.facetSummary = data;
    })
  }

  applyFilters(filters: Filter[], page: number) {
    this.filters = filters;
    let queryParam = "";
    for (let filter of filters) {
      queryParam += "filter=" + filter.searchPath + ":" + filter.value + "&";
    }

    this.searchText = this.searchText ? this.searchText : "";
    this.cohortService.searchCohorts(this.searchText, queryParam, page).subscribe(data => {
      this.cohorts = data;
      this.cohortsTableBuilder = new CohortTableBuilder(this.cohorts);
    });
  }

  nextPage(page) {
    this.applyFilters(this.filters, page.pageIndex);
  }

}
