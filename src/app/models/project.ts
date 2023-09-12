import {TableBuilder} from "./table-builder";
import {Cohort, DataTypes} from "./cohort";

export class Project {

}

export class ProjectTableBuilder implements TableBuilder<Project> {
  data: Project[];
  columnDef: {};

  constructor(projects: Project[]) {
    this.data = projects;

    this.columnDef = {
      'Acronym': {
        'field': 'Acronym',
        'path': 'acronym',
        'rowspan': 2,
        'colspan': 1
      },
      'Title': {
        'field': 'Title',
        'path': 'cohortName',
        'rowspan': 2,
        'colspan': 1
      },
      'Participants': {
        'field': 'Participants',
        'path': 'totalEnrollment',
        'rowspan': 2,
        'colspan': 1
      },
      'Enrollment Period': {
        'field': 'Enrollment Period',
        'path': 'startDate',
        'rowspan': 2,
        'colspan': 1
      },
      'Data Types': {
        'field': 'Data Types',
        'path': 'endDate',
        'rowspan': 1,
        'colspan': 5
      },
      'data1': {
        'field': 'data1',
        'path': 'dataTypes.biospecimens',
        'rowspan': 1,
        'colspan': 1,
        'type': 'boolean',
        'icon': 'icon-common icon-flask'
      },
      'data2': {
        'field': 'data2',
        'path': 'dataTypes.environmentalData',
        'rowspan': 1,
        'colspan': 1,
        'type': 'boolean',
        'icon': 'icon-common icon-stethoscope'
      },
      'data3': {
        'field': 'data3',
        'path': 'dataTypes.genomicData',
        'rowspan': 1,
        'colspan': 1,
        'type': 'boolean',
        'icon': 'icon-species icon-human'
      },
      'data4': {
        'field': 'data4',
        'path': 'dataTypes.phenotypicData',
        'rowspan': 1,
        'colspan': 1,
        'type': 'boolean',
        'icon': 'icon-species icon-virus'
      },
      'data5': {
        'field': 'data5',
        'path': 'dataTypes.other',
        'rowspan': 1,
        'colspan': 1,
        'type': 'boolean',
        'icon': 'icon-common icon-plus'
      }
    };
  }

  getTableHeaders(): string[] {
    return ['Acronym', 'Title', 'Participants', 'Enrollment Period', 'data1', 'data2', 'data3', 'data4', 'data5'];
  }

  getHeaderNames(): string[] {
    return ['Acronym', 'Title', 'Participants', 'Enrollment Period', 'Data Types'];
  }

  getSubHeaderNames(): string[] {
    return ['data1', 'data2', 'data3', 'data4', 'data5'];
  }

  getColumnDefinitions(): {} {
    return this.columnDef;
  }
}







