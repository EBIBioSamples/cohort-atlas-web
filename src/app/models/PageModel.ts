export class PageModel<T extends Embedded<any>> {
  _embedded: T;
  _links: Links;
  page: Page;
}

export interface Embedded<T> {
  getData(): T[];
}

export class Links {
  self: Link;
}

export class Link {
  href: string;
}

export class Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}
