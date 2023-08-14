import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CohortService} from "../../service/cohort.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-facet-panel',
  templateUrl: './facet-panel.component.html',
  styleUrls: ['./facet-panel.component.scss']
})
export class FacetPanelComponent implements OnInit {
  dataTypes: string[] = ['Biospecimens', 'Environmental Data', 'Genomic Data', 'Phenotypic Data', 'Other'];
  licences: string[] = ['MIT', 'Apache', 'BSD'];
  treatments: string[] = ['Antibiotic', 'Any Oxygen therapy', 'Chloroquine/hydroxychloroquine'];
  diseases: string[] = ['Hypertension', 'Obesity (as defined by clinical staff)', 'Chronic hematologic disease', 'Tuberculosis'];
  medication: string[] = ['Antibiotic', 'Non-steroidal anti-inflammatory (NSAID)', 'Antivirals', 'Oral steroids'];
  outcome: string[] = ['Discharged alive', 'Palliative discharge', 'Transfer to other facility', 'Death'];
  complications: string[] = ['Bronchiolitis', 'Cardiac arrest', 'Myocardial infarction', 'Pneumothorax', 'Bacterial pneumonia'];

  constructor(private router: Router, private _formBuilder: FormBuilder, private cohortService: CohortService) {
  }

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
    this.diseases.forEach(value => {
      this.filterFormGroup.controls['diseases'].addControl(value, new FormControl(false));
    });
    this.medication.forEach(value => {
      this.filterFormGroup.controls['medication'].addControl(value, new FormControl(false));
    });
    this.outcome.forEach(value => {
      this.filterFormGroup.controls['outcome'].addControl(value, new FormControl(false));
    });
    this.complications.forEach(value => {
      this.filterFormGroup.controls['complications'].addControl(value, new FormControl(false));
    });
  }

  filterFormGroup = this._formBuilder.group({
    dataTypes: new FormGroup({}),
    licences: new FormGroup({}),
    treatments: new FormGroup({}),
    diseases: new FormGroup({}),
    medication: new FormGroup({}),
    outcome: new FormGroup({}),
    complications: new FormGroup({})
  });

  sendFilters() {

    let filterStr = String("");
    let queryParam = String("");

    this.dataTypes.forEach(dataType => {
      if (this.filterFormGroup.controls.dataTypes.get(dataType).value)
        filterStr = filterStr.concat(dataType + "~");
    });

    if (filterStr) {
      queryParam = queryParam.concat(queryParam ? "&filter=dataTypes:" : "filter=dataTypes:").concat(filterStr.slice(0, -1));
    }

    filterStr = String("");
    this.licences.forEach(licence => {
      if (this.filterFormGroup.controls.licences.get(licence).value)
        filterStr = filterStr.concat(licence + "~");
    });

    if (filterStr) {
      queryParam = queryParam.concat(queryParam ? "&filter=license:" : "filter=license:").concat(filterStr.slice(0, -1));
    }

    filterStr = String("");
    this.treatments.forEach(treatment => {
      if (this.filterFormGroup.controls.treatments.get(treatment).value)
        filterStr = filterStr.concat(treatment + "~");
    });
    if (filterStr) {
      queryParam = queryParam.concat(queryParam ? "&filter=dataSummary.treatment:" : "filter=dataSummary.treatment:").concat(filterStr.slice(0, -1));
    }



    filterStr = String("");
    this.treatments.forEach(treatment => {
      if (this.filterFormGroup.controls.treatments.get(treatment).value)
        filterStr = filterStr.concat(treatment + "~");
    });
    if (filterStr) {
      queryParam = queryParam.concat(queryParam ? "&filter=dataSummary.treatment:" : "filter=dataSummary.treatment:").concat(filterStr.slice(0, -1));
    }

    filterStr = String("");
    this.diseases.forEach(value => {
      if (this.filterFormGroup.controls.diseases.get(value).value)
        filterStr = filterStr.concat(value + "~");
    });
    if (filterStr) {
      queryParam = queryParam.concat(queryParam ? "&filter=dataSummary.diseases:" : "filter=dataSummary.diseases:").concat(filterStr.slice(0, -1));
    }

    filterStr = String("");
    this.medication.forEach(value => {
      if (this.filterFormGroup.controls.medication.get(value).value)
        filterStr = filterStr.concat(value + "~");
    });
    if (filterStr) {
      queryParam = queryParam.concat(queryParam ? "&filter=dataSummary.medication:" : "filter=dataSummary.medication:").concat(filterStr.slice(0, -1));
    }

    filterStr = String("");
    this.outcome.forEach(value => {
      if (this.filterFormGroup.controls.outcome.get(value).value)
        filterStr = filterStr.concat(value + "~");
    });
    if (filterStr) {
      queryParam = queryParam.concat(queryParam ? "&filter=dataSummary.outcome:" : "filter=dataSummary.outcome:").concat(filterStr.slice(0, -1));
    }

    filterStr = String("");
    this.complications.forEach(value => {
      if (this.filterFormGroup.controls.complications.get(value).value)
        filterStr = filterStr.concat(value + "~");
    });
    if (filterStr) {
      queryParam = queryParam.concat(queryParam ? "&filter=dataSummary.complications:" : "filter=dataSummary.complications:").concat(filterStr.slice(0, -1));
    }

    console.log('Applied filters', queryParam);

    // @ts-ignore
    this.applyFilterEvent.emit(queryParam);
  }


}
