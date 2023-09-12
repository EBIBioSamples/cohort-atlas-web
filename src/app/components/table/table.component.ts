import {Component, Input, OnInit} from '@angular/core';
import {TableBuilder} from "../../models/table-builder";
import {TableManagerService} from "../../service/table-manager.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit {
  @Input() cohorts: T[];
  @Input() tableBuilder: TableBuilder<T>;

  displayedColumns = [
    'Acronym', 'Title', 'Participants', 'Enrollment Period', 'License', 'Data Types'
  ];

  headers: string[];
  columnHeaders: string[];
  columnSubHeaders: string[];

  constructor(private tableManagerService: TableManagerService) {
  }

  ngOnInit(): void {
    this.headers = this.tableBuilder.getTableHeaders();
  }

  getChildElementValue(object: any, path: string) {
    let value = this.tableManagerService.getChildElementValue(object, path);
    if (!value) {
     value = "";
    }
    return value;
  }

  onClickTableRow(row) {
    console.log(row);
  }
}
