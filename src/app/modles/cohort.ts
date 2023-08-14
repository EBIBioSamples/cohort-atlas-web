export class CohortList {
  _embedded: Embedded;
  _links: Links;
  page: Page;
}

export class Embedded {
  cohorts: Cohort[];
}

export class Links {
  // _links: {
  //   self: {
  //     href: "http://localhost:8080/cohorts"
  //   }
  // }
}

export class Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export class Cohort {
  accession: string;
  cohortName: string;
  description: string;
  acronym: string;
  website: string;
  logo: string;
  type: string;
  studyDesign: string;
  provider: Provider;
  license: string;
  rights: string;
  dataSharing: Ontology;
  contacts: Contact[];
  investigators: Contact[];
  startDate: string;
  endDate: string;
  targetEnrollment: number;
  totalEnrollment: number;
  publications: Publication[];
  funding: string;
  acknowledgements: string;
  territories: string[];
  dataTypes: DataTypes;

  datasets: Dataset[];
  projects: Project[];

  attachments: Attachment[];
  externalLinks: ExternalLink[];
  supplementaryInformation: string;

  dictionary: Field[];
  relationships: Relation[];

  dataSummary: Summary;
  tags: string[];
  label: string;
}

export class Provider {
  name: string;
  acronym: string;
  website: string;
  description: string;
  contacts: string;
  logo: string;
  resources: string;
}

export class Contact {
  name: string;
  email: string;
  orcid: string;
  affiliation: string;
  address: string;
  role: string;
}

export class Ontology {
  id: string;
  label: string;
}

export class Publication {
  title: string;
  doi: string;
  url: string;
}

export class DataTypes {
  biospecimens: boolean;
  environmentalData: boolean;
  genomicData: boolean;
  phenotypicData: boolean;
}

export class Dataset {
  name: string;
}

export class Project {
  name: string;
}

export class Attachment {
  name: string;
  resource: string;
  hyperlink: string;
  file: string;
  description: string;
}

export class ExternalLink {
  label: string;
  url: string;
  type: string;
  archive: string;
  cohort: string;
}

export class Field {
  name: string;
  label: string;
  description: string;
  type: string;
  values: string;
  parent: string;
  suggestions: string[];
  annotation: string;
  tags: string;
}

export class Relation {
  source: string;
  type: string;
}

export class Summary {
  diseases: string[];
  medication: string[];
  treatment: string[];
  outcome: string[];
  complications: string[];
  typeOfData: string[];
  ageRange: string;
  ageGroups: string[];
  sampleSize: number;
  sampleType: string;
  followUpSchedule: string;
  collectionType: string;
  inclusionCriteria: string;
  releaseType: string;
  linkageOptions: string;
}

