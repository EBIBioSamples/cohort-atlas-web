import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CohortService} from "../../service/cohort.service";

@Component({
  selector: 'app-cohort',
  templateUrl: './cohort.component.html',
  styleUrls: ['./cohort.component.scss']
})
export class CohortComponent implements OnInit {

  cohortAccession: string;
  cohort: any;

  constructor(private route: ActivatedRoute, private cohortService: CohortService) {
  }

  ngOnInit(): void {
    this.route.queryParamMap
      .subscribe((params) => {
          this.cohortAccession = params["params"]["accession"];
          this.getCohort(this.cohortAccession);
        }
      );
  }

  getCohort(accession: string) {
    this.cohortService.getCohort(accession).subscribe(cohort => {
      this.cohort = cohort;
    })
  }

}
