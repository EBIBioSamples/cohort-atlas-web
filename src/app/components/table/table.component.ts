import {Component, Input, OnInit} from '@angular/core';
import {MatButtonToggleGroup} from '@angular/material/button-toggle';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() cohorts: any;

  displayedColumns = [
    'Acronym',	'Title',	'Participants',	'Enrollment Period',	'License',	'Data Types'
  ];

  ngOnInit(): void {

  }
}
