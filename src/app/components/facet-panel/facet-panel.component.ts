import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CohortService} from "../../service/cohort.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-facet-panel',
  templateUrl: './facet-panel.component.html',
  styleUrls: ['./facet-panel.component.scss']
})
export class FacetPanelComponent implements OnInit {
  dataTypes: string[] = ['Biospecimens', 'Environmental Data', 'Genomic Data', 'Phenotypic Data','Other'];
  licences: string[] = ['MIT', 'Apache','BSD'];
  treatments: string[] = ['Antibiotic', 'Any Oxygen therapy','Chloroquine/hydroxychloroquine'];

  constructor(private router: Router, private _formBuilder: FormBuilder,  private cohortService: CohortService) { }

  ngOnInit(): void {
    this.dataTypes.forEach(dataType => {
      this.filterFormGroup.controls['dataTypes'].addControl(dataType, new FormControl(false));
    });
    this.licences.forEach(licence => {
      this.filterFormGroup.controls['licences'].addControl(licence, new FormControl(false));
    });
    this.treatments.forEach(treatment => {
      this.filterFormGroup.controls['treatments'].addControl(treatment, new FormControl(false));
    });
  }
  filterFormGroup = this._formBuilder.group({
    dataTypes : new FormGroup({ }),
    licences : new FormGroup({ }),
    treatments : new FormGroup({ })
  });

  applyFilters() {

   let filters = new Map();
   let filterStr = String("");

    this.dataTypes.forEach(dataType => {
      if(this.filterFormGroup.controls.dataTypes.get(dataType).value)
        filterStr=filterStr.concat(dataType+"~");
    });
    filters.set("dataType", filterStr);

    filterStr = String("");
    this.licences.forEach(licence => {
      if(this.filterFormGroup.controls.licences.get(licence).value)
        filterStr=filterStr.concat(licence+"~");
    });
    filters.set("licences", filterStr);

    filterStr = String("");
    this.treatments.forEach(treatment => {
      if(this.filterFormGroup.controls.treatments.get(treatment).value)
        filterStr=filterStr.concat(treatment+"~");
    });
    filters.set("treatments", filterStr);

    console.log('Applied filters', filters);

    console.log('You are applying filter', this.filterFormGroup.value);

   // this.cohortService.getCohorts();


     // this.router.navigate(['/search']);


  }


}
