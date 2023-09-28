import {TableBuilder} from "./table-builder";
import {Embedded, PageModel} from "./page-model";

export class EmbeddedField implements Embedded<Field> {
  dictionaryFields: Field[];

  getData(): Field[] {
    return this.dictionaryFields;
  }
}

export class Field {
  name: string;
  label: string;
  description: string;
  type: string;
  values: string;
  parent: string;
  cohort: string;
  project: string;
  suggestions: Suggestion[];
  annotation: string;
  tags: string;
}

export class Suggestion {
  fieldName: string;
  matchPercentage: number;
}

export class FieldTableBuilder extends TableBuilder<Field, EmbeddedField> {

  constructor(pageModel: PageModel<EmbeddedField>) {
    super();
    this.data = pageModel._embedded.dictionaryFields;
    this.pageModel = pageModel;

    this.columnDef = {
      'Name': {
        'field': 'Name',
        'path': 'name',
        'primary': true,
        'display': true,
        'rowspan': 2,
        'colspan': 1,
        'type': 'string',
        'icon': ''
      },
      'Description': {
        'field': 'description',
        'path': 'description',
        'primary': true,
        'display': true,
        'rowspan': 2,
        'colspan': 1,
        'type': 'string',
        'icon': ''
      },
      'Type': {
        'field': 'type',
        'path': 'type',
        'primary': true,
        'display': true,
        'rowspan': 2,
        'colspan': 1,
        'type': 'string',
        'icon': ''
      },
      'Annotation': {
        'field': 'annotation',
        'path': 'annotation',
        'primary': true,
        'display': true,
        'rowspan': 2,
        'colspan': 1,
        'type': 'string',
        'icon': ''
      },
      'Project': {
        'field': 'project',
        'path': 'project',
        'primary': true,
        'display': true,
        'rowspan': 2,
        'colspan': 1,
        'type': 'string',
        'icon': ''
      },
      'Cohort': {
        'field': 'cohort',
        'path': 'cohort',
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







