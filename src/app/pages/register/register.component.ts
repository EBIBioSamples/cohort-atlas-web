import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";
import {RegisterBasicComponent} from "../../components/register-basic/register-basic.component";
import {RegisterAdditionalComponent} from "../../components/register-additional/register-additional.component";
import {RegisterDictionaryComponent} from "../../components/register-dictionary/register-dictionary.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerBasicComponent') registerBasicComponent: RegisterBasicComponent;
  @ViewChild('registerAdditionalComponent') registerAdditionalComponent: RegisterAdditionalComponent;
  @ViewChild('registerDictionaryComponent') registerDictionaryComponent: RegisterDictionaryComponent;

  accession: string;
  registerStudyForm: FormGroup;
  registerAdditionalStudyForm: FormGroup;

  constructor(private router: Router, private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.registerStudyForm = this.registerBasicComponent ? this.registerBasicComponent.registerStudyForm : null;
    this.registerAdditionalStudyForm = this.registerAdditionalComponent ? this.registerAdditionalComponent.registerAdditionalStudyForm : null;
  }

  getRegisteredCohortAccession(registeredAccession: string) {
    this.accession = registeredAccession;
  }

  get registerDictionaryForm() {
    return this.registerAdditionalComponent ? this.registerAdditionalComponent.registerAdditionalStudyForm : null;
  }

}
