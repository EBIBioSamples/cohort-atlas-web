import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CohortService} from "../../service/cohort.service";

@Component({
  selector: 'app-register-additional',
  templateUrl: './register-additional.component.html',
  styleUrls: ['./register-additional.component.scss']
})
export class RegisterAdditionalComponent {
  registerAdditionalStudyForm: FormGroup;
  @Input() accession: string;

  constructor(private formBuilder: FormBuilder, private cohortService: CohortService) {
    this.registerAdditionalStudyForm = this.formBuilder.group({
      biosampleAccessions: [''],
      egaDatasets: [''],
      survey: this.formBuilder.group({
        ethnicity: this.formBuilder.group({
          asian: [''],
          african: [''],
          european: [''],
          hispanic: [''],
          middleEastern: [''],
          other: [''],
        }),
        biosamples: this.formBuilder.group({
          plasmaSample: [''],
          bloodSample: ['']
        }),
        genomicData: this.formBuilder.group({
          genotypeArrays: [''],
          wholeExomes: ['']
        }),
        exposure: this.formBuilder.group({
          lifestyle: [false],
          builtEnvironment: [false],
          weatherAtmosphere: [false],
          stress: [false],
          toxicOrChemicalExposure: [false],
          dietAndMedications: [false],
          socialDeterminantsOfHealth: [false],
          other: [false]
        })
      })
    });
    console.log("and the accession is: " + this.accession);
  }


  saveAdditionalCohortAttributes() {
    console.info('Adding additional cohort attributes: ', this.registerAdditionalStudyForm.value);
    let additionalCohortData = this.registerAdditionalStudyForm.value;
    let biosamplesAccessions = additionalCohortData.biosampleAccessions;
    let egaDatasets = additionalCohortData.egaDatasets;
    let relationships = [];
    for (let accession of biosamplesAccessions.split(',')) {
      relationships.push({'source': 'biosample:' + accession.trim(), 'type': 'IS_RELATED_TO'})
    }
    for (let accession of egaDatasets.split(',')) {
      if (accession.includes('EGAD')) {
        relationships.push({'source': 'ega.dataset:' + accession.trim(), 'type': 'IS_RELATED_TO'})
      } else {
        relationships.push({'source': 'ega.study:' + accession.trim(), 'type': 'IS_RELATED_TO'})
      }
    }
    this.saveCohortRelationships(relationships);

    let survey = additionalCohortData.survey;
    this.saveSurveyData(survey);

  }

  saveCohortRelationships(relationships) {
    this.cohortService.saveCohortRelationships(this.accession, relationships)
      .subscribe((response) => {
        console.log(response);
      });
  }

  saveSurveyData(survey) {
    this.cohortService.saveSurveyData(this.accession, survey)
      .subscribe((response) => {
        console.log(response);
      });
  }

}
