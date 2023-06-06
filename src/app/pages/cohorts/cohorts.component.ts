import { Component, OnInit } from '@angular/core';
import {CohortService} from "../../service/cohort.service";

@Component({
  selector: 'app-cohorts',
  templateUrl: './cohorts.component.html',
  styleUrls: ['./cohorts.component.scss']
})
export class CohortsComponent implements OnInit {

  cohorts: any;

  constructor(private cohortService: CohortService) { }

  ngOnInit(): void {
    this.cohortService.getCohorts().subscribe(data => {
      this.cohorts = data["_embedded"]["cohorts"];
      console.log(this.cohorts)
    });
  }

}
