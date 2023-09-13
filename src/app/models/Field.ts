import {TableBuilder} from "./table-builder";
import {Embedded, PageModel} from "./PageModel";

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
  suggestions: Suggestion[];
  annotation: string;
  tags: string;
}

export class Suggestion {
  fieldName: string;
  matchPercentage: number;
}

export class FieldTableBuilder implements TableBuilder<Field, EmbeddedField> {
  pageModel: PageModel<EmbeddedField>;
  data: Field[];
  columnDef: {};

  constructor(fields: Field[]) {
    this.data = fields;

    this.columnDef = {
      'Name': {
        'field': 'Name',
        'path': 'name',
        'rowspan': 1,
        'colspan': 1
      },
      'Description': {
        'field': 'description',
        'path': 'description',
        'rowspan': 1,
        'colspan': 1
      },
      'Type': {
        'field': 'type',
        'path': 'type',
        'rowspan': 1,
        'colspan': 1
      },
      'Annotation': {
        'field': 'annotation',
        'path': 'annotation',
        'rowspan': 1,
        'colspan': 1
      },
      'Project': {
        'field': 'project',
        'path': 'project',
        'rowspan': 1,
        'colspan': 1
      },
      'Cohort': {
        'field': 'cohort',
        'path': 'cohort',
        'rowspan': 1,
        'colspan': 1
      }
    };
  }

  getTableHeaders(): string[] {
    return ['Name', 'Description', 'Type', 'Annotation', 'Project', 'Cohort'];
  }

  getHeaderNames(): string[] {
    return ['Name', 'Description', 'Type', 'Annotation', 'Project', 'Cohort'];
  }

  getSubHeaderNames(): string[] {
    return [];
  }

  getColumnDefinitions(): {} {
    return this.columnDef;
  }
}







