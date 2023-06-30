import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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

  @Output() applyFilterEvent = new EventEmitter<String>();

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

  sendFilters() {

   let filterStr = String("");
   let queryParam = String("");

    this.dataTypes.forEach(dataType => {
      if(this.filterFormGroup.controls.dataTypes.get(dataType).value)
        filterStr=filterStr.concat(dataType+"~");
    });

    if(filterStr) {
      queryParam = queryParam.concat(queryParam? "&filter=dataType:" : "filter=dataType:").concat(filterStr.slice(0, -1));
    }

    filterStr = String("");
    this.licences.forEach(licence => {
      if(this.filterFormGroup.controls.licences.get(licence).value)
        filterStr=filterStr.concat(licence+"~");
    });

    if(filterStr) {
      queryParam = queryParam.concat(queryParam? "&filter=license:" : "filter=license:").concat(filterStr.slice(0, -1));
    }

    filterStr = String("");
    this.treatments.forEach(treatment => {
      if(this.filterFormGroup.controls.treatments.get(treatment).value)
        filterStr=filterStr.concat(treatment+"~");
    });
    if(filterStr) {
      queryParam = queryParam.concat(queryParam? "&filter=treatments:" : "filter=treatments:").concat(filterStr.slice(0, -1));
    }

    console.log('Applied filters', queryParam);

    // @ts-ignore
    this.applyFilterEvent.emit(queryParam);
  }


}
