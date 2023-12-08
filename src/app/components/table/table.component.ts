import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TableBuilder} from "../../models/table-builder";
import {TableManagerService} from "../../service/table-manager.service";
import {MatPaginator} from "@angular/material/paginator";
import {Embedded} from "../../models/page-model";
import {ColumnDefinition} from "../../models/column-definition";
import {Cohort} from "../../models/cohort";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T, S extends Embedded<any>> implements OnInit, AfterViewInit {
  @Input() data: T[];
  @Input() tableBuilder: TableBuilder<T, S>;
  @Output() pageChange = new EventEmitter<MatPaginator>();

  @Output() detailEvent = new EventEmitter<Cohort>();
  totalRecords: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tableManagerService: TableManagerService) {
  }

  ngOnInit(): void {
    this.totalRecords = this.tableBuilder.pageModel.page.totalElements;
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => {
      this.pageChange.emit(this.paginator);
    })
  }

  getChildElementValue(object: any, path: string) {
    let value = this.tableManagerService.getChildElementValue(object, path);
    if (!value) {
      value = "";
    }
    return value;
  }

  onSelectNewColumn(columnDef: ColumnDefinition, event: Event) {
    columnDef.display = !columnDef.display;
    event.stopPropagation();
  }

  onClickTableRow(row) {
    console.log(row);
    row.expanded = !row.expanded;
    this.detailEvent.emit(row);
    console.log("end expand");
  }
}
