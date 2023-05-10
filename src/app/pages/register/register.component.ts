import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
    // descriptionCtrl: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
  });

  isLinear = true;

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

}
