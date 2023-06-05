import {Component, OnInit} from '@angular/core';
import {CohortService} from "../../service/cohort.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerFormGroup = this._formBuilder.group({
    cohortName: ['', Validators.required],
    description: ['', Validators.required],
    acronym: ['', Validators.required],
    website: [''],
    provider: [''],
    license: [''],
    contacts: [''],
    startDate: [''],
    endDate: [''],
    targetEnrollment: [''],
    totalEnrollment: [''],
    territories: ['']
  });

  secondFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
  });

  isLinear = true;

  constructor(private _formBuilder: FormBuilder, private cohortService: CohortService) {
  }

  ngOnInit(): void {
  }

  submitForm() {
    console.warn('Your order has been submitted', this.registerFormGroup.value);
    this.cohortService.registerCohort(this.registerFormGroup);
  }
}
