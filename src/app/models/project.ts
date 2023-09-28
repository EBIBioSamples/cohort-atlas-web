import {TableBuilder} from "./table-builder";
import {Embedded, PageModel} from "./page-model";


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

export class ProjectTableBuilder extends TableBuilder<Project, EmbeddedProject> {

  constructor(pageModel: PageModel<EmbeddedProject>) {
    super();
    this.pageModel = pageModel;
    this.data = pageModel._embedded.projects;

    this.columnDef = {
      'Acronym': {
        'field': 'Acronym',
        'path': 'acronym',
        'primary': true,
        'display': true,
        'rowspan': 2,
        'colspan': 1,
        'type': 'string',
        'icon': ''
      },
      'Title': {
        'field': 'Title',
        'path': 'name',
        'primary': true,
        'display': true,
        'rowspan': 2,
        'colspan': 1,
        'type': 'string',
        'icon': ''
      },
      'Start Date': {
        'field': 'startDate',
        'path': 'startDate',
        'primary': true,
        'display': true,
        'rowspan': 2,
        'colspan': 1,
        'type': 'string',
        'icon': ''
      },
      'End Date': {
        'field': 'endDate',
        'path': 'endDate',
        'primary': true,
        'display': true,
        'rowspan': 2,
        'colspan': 1,
        'type': 'string',
        'icon': ''
      }
    };
  }
}







