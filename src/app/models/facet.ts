export class Facet {
  category: string;
  displayName: string;
  searchPath: string;
  count: number;
  values: FacetValue[];
}

export class FacetValue {
  label: string;
  count: number
}

export class Filter {
  category: string;
  searchPath: string;
  value: string;
}

export class FacetSummary {
  projects: number;
  datasets: number;
  variables: number;
  harmonisedVariables: number;
  links: number;
}
