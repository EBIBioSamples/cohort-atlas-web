import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CohortService} from "../../service/cohort.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DictionaryDialogComponent} from "../../components/dictionary-dialog/dictionary-dialog.component";
import {Field} from "../../models/Field";

export interface DictionaryField {
  id: string;
  name: string;
  label: string;
  description: string;
  type: string;
  values: string;
  parent: string;
  suggestions: string[];
  tags: string;
}

@Component({
  selector: 'app-harmonise',
  templateUrl: './harmonise.component.html',
  styleUrls: ['./harmonise.component.scss']
})
export class HarmoniseComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() dictionaryFields: Field[];

  displayedColumns: string[] = ['id', 'name', 'label', 'description', 'type', 'values', 'parent', 'suggestions', 'tags'];
  dataSource: MatTableDataSource<Field>;
  options: string[] = ['Gender', 'Age/Birthdate', 'occupation', 'dietary history', 'heart rate', 'sleep history', 'prescription'];
  suggestions = [
    {
      "field": "Gender",
      "description": "Sex or gender of the participants",
      "matchPercentage": 95.3
    },
    {
      "field": "Age/Birthdate",
      "description": "Information about current age or birthdate",
      "matchPercentage": 85.3
    },
    {
      "field": "dietary history",
      "description": "dietary history",
      "matchPercentage": 70
    }
  ];

  cohortAccession: string;
  fileToUpload: File | null = null;
  fileName: string = "";

  dataDictionary: Field[];

  constructor(private router: Router, public dialog: MatDialog, private cohortService: CohortService) {
    // const fields = getTestDictionaryFields();
    this.dataDictionary = this.cohortService.dataDictionary;
    this.dataSource = new MatTableDataSource(this.dataDictionary);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(field) {
    const dialogRef = this.dialog.open(DictionaryDialogComponent, {data: field, width: '80%', height: '90%'});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        field.annotation = result;
      }
      console.log(`Dialog result: ${result}`);

    });
  }

  saveDictionary() {
    let fields = [];
    for (let field of this.cohortService.dataDictionary) {
      fields.push({
        "name": field.name,
        "description": field.description,
        "annotation": field.annotation,
      })
    }

    console.log("saving dictionary");
    this.cohortService.saveDictionary(this.cohortAccession, fields).subscribe(data => {
      console.log("Dictionary saved")
    });
  }


  handleFileInput(e: any) {
    this.fileToUpload = e.target.files.item(0);
    this.fileName = this.fileToUpload.name;
    this.uploadDictionary();
  }

  uploadDictionary() {
    if (this.fileToUpload != null) {
      this.cohortService.postFile(this.fileToUpload).subscribe(data => {
        this.cohortService.dataDictionary = data;


        this.dataDictionary = this.cohortService.dataDictionary;
        this.dataSource = new MatTableDataSource(this.dataDictionary);
      }, error => {
        console.log(error);
      });
    }
  }
}

/** Return test dictionary fields */
function getTestDictionaryFields(): DictionaryField[] {
  return [
    {
      id: "test_id_1",
      name: "gen_xyz",
      label: "gender",
      description: "gender of the participant",
      type: "enum",
      values: "1, 2",
      parent: "Physical Characteristics",
      suggestions: ["Gender", "Sex"],
      tags: "",
    },
    {
      id: "test_id_2",
      name: "wt",
      label: "weight",
      description: "Weight at the first screening",
      type: "number",
      values: "1 - 300",
      parent: "physiological measurement",
      suggestions: ["Weight", "Height"],
      tags: "",
    },
    {
      id: "test_id_3",
      name: "ske",
      label: "smoking ",
      description: "smoking history",
      type: "string",
      values: "",
      parent: "Substance use",
      suggestions: ["Tobacco use history", "Parent Tobacco use"],
      tags: "tobacco",
    }
  ];


}
