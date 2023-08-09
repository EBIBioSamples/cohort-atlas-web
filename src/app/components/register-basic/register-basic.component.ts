import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CohortService} from "../../service/cohort.service";

@Component({
  selector: 'app-register-basic',
  templateUrl: './register-basic.component.html',
  styleUrls: ['./register-basic.component.scss']
})
export class RegisterBasicComponent {
  registerStudyForm: FormGroup;
  @Output() accessionEmitter = new EventEmitter<string>();

  TEST_REQUIRED = '';

  constructor(private cohortService: CohortService, private formBuilder: FormBuilder) {
    this.registerStudyForm = this.formBuilder.group({
      cohortName: ['', Validators.required],
      acronym: ['', Validators.required],
      description: ['', this.TEST_REQUIRED],
      website: [''],
      license: ['', this.TEST_REQUIRED],

      startDate: ['', this.TEST_REQUIRED],
      endDate: [''],
      targetEnrollment: [''],
      totalEnrollment: ['', this.TEST_REQUIRED],
      studyDesign: ['', this.TEST_REQUIRED],
      territories: this.formBuilder.array([
        this.formBuilder.control('')
      ]),

      funding: [''],
      acknowledgements: [''],

      provider: this.formBuilder.group({
        name: ['', this.TEST_REQUIRED],
        description: ['', this.TEST_REQUIRED],
        website: [''],
        acronym: [''],
        logo: [''],
        contacts: [''],
        resources: ['']
      }),

      dataTypes: this.formBuilder.group({
        biospecimens: [false],
        environmentalData: [false],
        genomicData: [false],
        phenotypicData: [false],
        other: [false]
      }),
      publications: this.formBuilder.array([
        this.formBuilder.group({
          title: [''],
          doi: ['']
        })
      ]),

      contacts: this.formBuilder.array([
        this.formBuilder.group({
          name: ['', this.TEST_REQUIRED],
          email: ['', this.TEST_REQUIRED],
          orcid: [''],
          affiliation: ['', this.TEST_REQUIRED],
          address: [''],
          role: ['', this.TEST_REQUIRED]
        })
      ]),
      investigators: this.formBuilder.array([
        this.formBuilder.group({
          name: ['', this.TEST_REQUIRED],
          email: ['', this.TEST_REQUIRED],
          orcid: [''],
          affiliation: ['', this.TEST_REQUIRED],
          address: [''],
          role: ['', this.TEST_REQUIRED]
        })
      ])
    });
  }


  createNewCohort() {
    console.warn('Creating a new cohort: ', this.registerStudyForm.value);
    this.cohortService.registerCohort1(this.registerStudyForm.value)
      .subscribe((response) => {
        console.log("registered" + JSON.stringify(response));
        console.log("cohort: " + response["accession"]);
        this.accessionEmitter.emit(response["accession"]);
      });

  }

  get territories() {
    return this.registerStudyForm.get('territories') as FormArray;
  }

  addTerritory() {
    this.territories.push(this.formBuilder.control(''));
  }

  get publications() {
    return this.registerStudyForm.get('publications') as FormArray;
  }

  addPublication() {
    this.publications.push(this.formBuilder.group({
      title: [''],
      doi: ['']
    }));
  }

  get contacts() {
    return this.registerStudyForm.get('contacts') as FormArray;
  }

  addContact() {
    this.contacts.push(this.formBuilder.group({
      name: [''],
      email: [''],
      orcid: [''],
      affiliation: [''],
      address: [''],
      role: ['']
    }));
  }

  get investigators() {
    return this.registerStudyForm.get('investigators') as FormArray;
  }

  addInvestigator() {
    this.investigators.push(this.formBuilder.group({
      name: [''],
      email: [''],
      orcid: [''],
      affiliation: [''],
      address: [''],
      role: ['']
    }));
  }


}
