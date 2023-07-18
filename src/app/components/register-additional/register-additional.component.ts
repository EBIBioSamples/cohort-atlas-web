import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CohortService} from "../../service/cohort.service";

@Component({
  selector: 'app-register-additional',
  templateUrl: './register-additional.component.html',
  styleUrls: ['./register-additional.component.scss']
})
export class RegisterAdditionalComponent {
  registerAdditionalStudyForm: FormGroup<{}>;

  constructor(private formBuilder: FormBuilder, private cohortService: CohortService) {
    this.registerAdditionalStudyForm = this.formBuilder.group({
      // secondCtrl: ['', Validators.required],
    });
  }

}
