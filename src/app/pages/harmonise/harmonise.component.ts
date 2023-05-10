import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface DictionaryField {
  id: string;
  name: string;
  label: string;
  description: string;
  type: string;
  values: string;
  parent: string;
  annotations: string[];
  tags: string;
}

@Component({
  selector: 'app-harmonise',
  templateUrl: './harmonise.component.html',
  styleUrls: ['./harmonise.component.scss']
})
export class HarmoniseComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'label', 'description', 'type', 'values', 'parent', 'annotations', 'tags'];
  dataSource: MatTableDataSource<DictionaryField>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    const dictionaryFields = getTestDictionaryFields();
    this.dataSource = new MatTableDataSource(dictionaryFields);
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
      annotations: ["Gender", "Sex"],
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
      annotations: ["Weight", "Height"],
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
      annotations: ["Tobacco use history", "Parent Tobacco use"],
      tags: "tobacco",
    }
  ];
}
