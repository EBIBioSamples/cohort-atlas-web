import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CohortService} from "../../service/cohort.service";

@Component({
  selector: 'app-register-basic',
  templateUrl: './register-basic.component.html',
  styleUrls: ['./register-basic.component.scss']
})
export class RegisterBasicComponent {
  registerStudyForm: FormGroup;

  constructor(private cohortService: CohortService, private formBuilder: FormBuilder) {
    this.registerStudyForm = this.formBuilder.group({
      cohortName: ['', Validators.required],
      acronym: ['', Validators.required],
      description: ['', Validators.required],
      website: [''],
      license: ['', Validators.required],

      startDate: ['', Validators.required],
      endDate: [''],
      targetEnrollment: [''],
      totalEnrollment: ['', Validators.required],
      studyDesign: ['', Validators.required],
      territories: this.formBuilder.array([
        this.formBuilder.control([''])
      ]),

      funding: [''],
      acknowledgements: [''],

      provider: this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
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
          name: ['', Validators.required],
          email: ['', Validators.required],
          orcid: [''],
          affiliation: ['', Validators.required],
          address: [''],
          role: ['', Validators.required]
        })
      ]),
      investigators: this.formBuilder.array([
        this.formBuilder.group({
          name: ['', Validators.required],
          email: ['', Validators.required],
          orcid: [''],
          affiliation: ['', Validators.required],
          address: [''],
          role: ['', Validators.required]
        })
      ])
    });
  }


  submitForm() {
    console.warn('Creating a new cohort: ', this.registerStudyForm.value);
    this.cohortService.registerCohort1(this.registerStudyForm.value);
  }

  get territories() {
    return this.registerStudyForm.get('territories') as FormArray;
  }

  addTerritory() {
    this.territories.push(this.formBuilder.control(['']));
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
