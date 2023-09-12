export interface TableBuilder<T> {
  data: T[];
  columnDef: {};

  getTableHeaders(): string[];

  getHeaderNames(): string[];

  getSubHeaderNames(): string[];

  getColumnDefinitions(): {};
}

