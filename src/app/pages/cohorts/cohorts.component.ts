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
    this.cohortService.searchCohorts().subscribe(page => {
      this.cohorts = page._embedded.cohorts;
      this.cohortsTableBuilder = new CohortTableBuilder(page);
    });

    this.projectService.searchProjects().subscribe(page => {
      this.projects = page._embedded.projects;
      this.projectsTableBuilder = new ProjectTableBuilder(page);
    });

    this.fieldService.getFields().subscribe(page => {
      this.fields = page._embedded.dictionaryFields;
      this.fieldTableBuilder = new FieldTableBuilder(page);
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
      this.cohorts = data._embedded.cohorts;
      this.cohortsTableBuilder = new CohortTableBuilder(data);
    });
  }

  nextPage(page: MatPaginator) {
    this.applyFilters(this.filters, page.pageIndex);
  }

  nextFieldPage(page: MatPaginator) {
    let queryParam = "";
    for (let filter of this.filters) {
      queryParam += "filter=" + filter.searchPath + ":" + filter.value + "&";
    }
    this.searchText = this.searchText ? this.searchText : "";

    this.fieldService.getFields(this.searchText, queryParam, page.pageIndex).subscribe(page => {
      this.fields = page._embedded.dictionaryFields;
      this.fieldTableBuilder = new FieldTableBuilder(page);
    });
  }

}
