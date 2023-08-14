import {Component, OnInit} from '@angular/core';
import {CohortService} from "../../service/cohort.service";
import {Cohort} from "../../modles/cohort";

@Component({
  selector: 'app-cohorts',
  templateUrl: './cohorts.component.html',
  styleUrls: ['./cohorts.component.scss']
})
export class CohortsComponent implements OnInit {
  cohorts: Cohort[];

  constructor(private cohortService: CohortService) {
  }

  ngOnInit(): void {
    this.cohortService.getCohorts().subscribe(data => {
      this.cohorts = data;
    });
  }

  applyFilters(filterQueryParams: String) {
    this.cohortService.searchCohorts(filterQueryParams.toString()).subscribe(data => {
      this.cohorts = data;
    });
  }
}
