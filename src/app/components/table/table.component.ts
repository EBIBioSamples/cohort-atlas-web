import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TableBuilder} from "../../models/table-builder";
import {TableManagerService} from "../../service/table-manager.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Filter} from "../../models/facet";
import {Embedded} from "../../models/PageModel";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T, S extends Embedded<any>> implements OnInit, AfterViewInit {
  @Input() data: T[];
  @Input() tableBuilder: TableBuilder<T, S>;
  @Output() pageChange = new EventEmitter<MatPaginator>();

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

  onClickTableRow(row) {
    console.log(row);
  }
}
