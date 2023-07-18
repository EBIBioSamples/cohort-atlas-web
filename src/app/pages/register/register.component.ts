import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
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

  constructor(private router: Router, private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  get registerStudyForm() {
    return this.registerBasicComponent ? this.registerBasicComponent.registerStudyForm : null;
  }

  get registerAdditionalStudyForm() {
    return this.registerAdditionalComponent ? this.registerAdditionalComponent.registerAdditionalStudyForm : null;
  }

  get registerDictionaryForm() {
    return this.registerAdditionalComponent ? this.registerAdditionalComponent.registerAdditionalStudyForm : null;
  }

}
