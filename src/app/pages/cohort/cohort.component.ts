import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CohortService} from "../../service/cohort.service";
import {Cohort} from "../../models/cohort";

@Component({
  selector: 'app-cohort',
  templateUrl: './cohort.component.html',
  styleUrls: ['./cohort.component.scss']
})
export class CohortComponent implements OnInit {

  cohortAccession: string;
  cohort: Cohort;
  cohortSummary = {
    dictionaryTerms: 0,
    mappedTerms: 0,
    archiveLinks: 0
  }

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

      this.cohortSummary.dictionaryTerms = cohort.dictionary ? cohort.dictionary.length : 0;
      this.cohortSummary.mappedTerms = cohort.dictionary ? cohort.dictionary.length : 0;
      this.cohortSummary.archiveLinks = cohort.relationships ? cohort.relationships.length : 0;
    })
  }

  openDialog() {
    alert("fill with data");
  }

}
