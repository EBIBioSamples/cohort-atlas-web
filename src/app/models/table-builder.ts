import {Embedded, PageModel} from "./page-model";
import {ColumnDefinition} from "./column-definition";

export class TableBuilder<T, S extends Embedded<any>> {
  pageModel: PageModel<S>;
  data: T[];
  columnDef: Record<string, ColumnDefinition>;

  getColumnDefinitions(): {} {
    return this.columnDef;
  }

  getTableHeaders(): string[] {
    return this.getHeaderNames().filter(key => this.columnDef[key].colspan === 1)
      .concat(this.getSubHeaderNames());
  }

  getHeaderNames(): string[] {
    return Object.keys(this.columnDef).filter(key => this.columnDef[key].primary && this.columnDef[key].display);
  }

  getSubHeaderNames(): string[] {
    return Object.keys(this.columnDef).filter(key => !this.columnDef[key].primary);
  }

  getDisplayHeaders(): any[] {
    return Object.keys(this.columnDef)
      .filter(key => this.columnDef[key].primary && this.columnDef[key].colspan === 1);
  }
}

