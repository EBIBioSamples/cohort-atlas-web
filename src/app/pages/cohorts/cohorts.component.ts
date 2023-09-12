import {Component, OnInit} from '@angular/core';
import {CohortService} from "../../service/cohort.service";
import {Cohort, CohortTableBuilder} from "../../models/cohort";
import {FacetService} from "../../service/facet.service";
import {FacetSummary} from "../../models/facet";

@Component({
  selector: 'app-cohorts',
  templateUrl: './cohorts.component.html',
  styleUrls: ['./cohorts.component.scss']
})
export class CohortsComponent implements OnInit {
  cohorts: Cohort[];
  cohortsTableBuilder: CohortTableBuilder;
  facetSummary: FacetSummary;

  constructor(private cohortService: CohortService, private facetService: FacetService) {
  }

  ngOnInit(): void {
    this.cohortService.getCohorts().subscribe(data => {
      this.cohorts = data;
      this.cohortsTableBuilder = new CohortTableBuilder(this.cohorts);
    });

    this.facetService.getOverallSummary().subscribe(data => {
      this.facetSummary = data;
    })
  }

  applyFilters(filterQueryParams: String) {
    this.cohortService.searchCohorts(filterQueryParams.toString()).subscribe(data => {
      this.cohorts = data;
    });
  }
}
