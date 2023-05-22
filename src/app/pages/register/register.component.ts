import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firstFormGroup: FormGroup;


  secondFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
  });

  isLinear = true;

  constructor(private _formBuilder: FormBuilder, private httpClient: HttpClient) {
    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      descriptionCtrl: ['', Validators.required],
      acronymCtrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  submitForm() {
    const formData = new FormData();
    // @ts-ignore
    formData.append('cohortName', this.firstFormGroup.get('nameCtrl').value);
    // @ts-ignore
    formData.append('description', this.firstFormGroup.get('descriptionCtrl').value);
    // @ts-ignore
    formData.append('acronym', this.firstFormGroup.get('acronymCtrl').value);

    this.httpClient.post<any>("http://localhost:8081/api/cohorts",
      JSON.stringify(formData), this.httpOptions).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
