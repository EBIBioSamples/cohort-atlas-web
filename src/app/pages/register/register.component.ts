import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CohortService} from "../../service/cohort.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  fileToUpload: File | null = null;

  registerFormGroup = this._formBuilder.group({
    // cohortName: ['', Validators.required],
    cohortName: [''],
    description: [''],
    acronym: [''],
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

  constructor(private router: Router, private _formBuilder: FormBuilder, private cohortService: CohortService) {
  }

  ngOnInit(): void {
  }

  submitForm() {
    console.warn('Creating a new cohort: ', this.registerFormGroup.value);
    // this.cohortService.registerCohort(this.registerFormGroup);
  }

  handleFileInput(e: any) {
    this.fileToUpload = e.target.files.item(0);
  }

  uploadFileToActivity() {
    if (this.fileToUpload != null) {
      this.cohortService.postFile(this.fileToUpload).subscribe(data => {
        this.cohortService.dataDictionary = data;
        this.router.navigate(['/harmonise']);
      }, error => {
        console.log(error);
      });
    }
  }

}
