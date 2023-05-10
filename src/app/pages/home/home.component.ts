import { Component, OnInit } from '@angular/core';
import {CohortService} from "../../service/cohort.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cohorts: any;

  constructor(private cohortService: CohortService) { }

  ngOnInit(): void {
    this.cohortService.getCohorts().subscribe(data => {
      this.cohorts = data["_embedded"]["cohortList"];

    });
  }

}
