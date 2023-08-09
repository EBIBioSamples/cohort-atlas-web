import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register-additional',
  templateUrl: './register-additional.component.html',
  styleUrls: ['./register-additional.component.scss']
})
export class RegisterAdditionalComponent implements OnInit {
  @Input() secondFormGroup: FormGroup<{}>;

  constructor() { }

  ngOnInit(): void {
  }

}
