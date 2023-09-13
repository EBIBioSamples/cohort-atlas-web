import {TableBuilder} from "./table-builder";
import {Embedded, PageModel} from "./PageModel";


export class EmbeddedProject implements Embedded<Project> {
  projects: Project[];

  getData(): Project[] {
    return this.projects;
  }
}

export class Project {
  accession: string;
  name: string;
  description: string;
  acronym: string;
  website: string;
  provider: string;
  rights: string;
  startDate: string;
  endDate: string;
  funding: string;
  acknowledgements: string;
}

export class ProjectTableBuilder implements TableBuilder<Project, EmbeddedProject> {
  pageModel: PageModel<EmbeddedProject>;
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
        'path': 'name',
        'rowspan': 2,
        'colspan': 1
      },
      'Start Date': {
        'field': 'startDate',
        'path': 'startDate',
        'rowspan': 2,
        'colspan': 1
      },
      'End Date': {
        'field': 'endDate',
        'path': 'endDate',
        'rowspan': 2,
        'colspan': 1
      }
    };
  }

  getTableHeaders(): string[] {
    return ['Acronym', 'Title', 'Start Date', 'End Date'];
  }

  getHeaderNames(): string[] {
    return ['Acronym', 'Title', 'Start Date', 'End Date'];
  }

  getSubHeaderNames(): string[] {
    return [];
  }

  getColumnDefinitions(): {} {
    return this.columnDef;
  }
}







