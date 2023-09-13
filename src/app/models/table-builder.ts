import {Embedded, PageModel} from "./PageModel";

export interface TableBuilder<T, S extends Embedded<any>> {
  pageModel: PageModel<S>;
  data: T[];
  columnDef: {};

  getTableHeaders(): string[];

  getHeaderNames(): string[];

  getSubHeaderNames(): string[];

  getColumnDefinitions(): {};
}

