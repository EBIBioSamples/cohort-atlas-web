import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TableBuilder} from "../../models/table-builder";
import {TableManagerService} from "../../service/table-manager.service";
import {MatPaginator} from "@angular/material/paginator";
import {Embedded} from "../../models/page-model";
import {ColumnDefinition} from "../../models/column-definition";
import {Cohort} from "../../models/cohort";
import {Router} from "@angular/router";

@Component({
  selector: 'app-quickview',
  templateUrl: './quickview.component.html',
  styleUrls: ['./quickview.component.scss']
})
export class QuickviewComponent implements OnInit  {


  constructor(private router: Router) {
  }
  @Input() detail: Cohort;
  ngOnInit(): void {

  }
/*  detail(row:Cohort) {
    console.log("EVENT RECEIVED AT DETAIL");
    console.log(row);



  }*/

  cohortDetail(accession: string){
    console.log("Accession got:"+accession);
    this.router.navigate(['/cohort/'+accession]);
  }

}
