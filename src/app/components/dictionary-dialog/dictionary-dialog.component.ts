import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Field} from "../../models/Field";

@Component({
  selector: 'app-dictionary-dialog',
  templateUrl: './dictionary-dialog.component.html',
  styleUrls: ['./dictionary-dialog.component.scss']
})
export class DictionaryDialogComponent implements OnInit {
  dictionary: any[];
  mapping: string;

  constructor(@Inject(MAT_DIALOG_DATA) public field: Field) {
  }

  ngOnInit(): void {
    this.dictionary = [
      {
        "category": "Lifestyle and behaviours",
        "fields": [
          {
            "name": "Tobacco",
            "description": "Current age or birthdate of the participant"
          },
          {
            "name": "Alcohol",
            "description": "Information about sex or gender identity"
          },
          {
            "name": "Sleep",
            "description": "Information about sex or gender identity"
          },
          {
            "name": "Physical activity",
            "description": "Information about sex or gender identity"
          }
        ]
      },
      {
        "category": "Socio-demographic and economic characteristics",
        "fields": [
          {
            "name": "Age/birthdate",
            "description": "Current age or birthdate of the participant"
          },
          {
            "name": "Sex/gender",
            "description": "Information about sex or gender identity"
          },
          {
            "name": "Education",
            "description": "Information about sex or gender identity"
          },
          {
            "name": "Ethnicity, race and religion",
            "description": "Information about sex or gender identity"
          }
        ]
      },
      {
        "category": "Diseases",
        "fields": [
          {
            "name": "Neoplasms",
            "description": "Current age or birthdate of the participant"
          },
          {
            "name": "Diseases of the nervous system",
            "description": "Information about sex or gender identity"
          }
        ]
      }
    ]
  }

}
