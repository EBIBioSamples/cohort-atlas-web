import {TableBuilder} from "./table-builder";
import {Field} from "./field";
import {Embedded, PageModel} from "./page-model";

export class EmbeddedCohort implements Embedded<Cohort> {
  cohorts: Cohort[];

  getData(): Cohort[] {
    return this.cohorts;
  }
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
  enrollmentPeriod: string;

  targetEnrollment: number;
  totalEnrollment: number;
  publications: Publication[];
  funding: string;
  acknowledgements: string;
  territories: string[];
  dataTypes: string[];

  projects: string[];

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


export class CohortTableBuilder extends TableBuilder<Cohort, EmbeddedCohort> {

  constructor(pageModel: PageModel<EmbeddedCohort>) {
    super();
    this.data = pageModel._embedded.cohorts;
    this.pageModel = pageModel;

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
      'startDate': {
        'field': 'startDate',
        'path': 'startDate',
        'primary': true,
        'display': false,
        'rowspan': 2,
        'colspan': 1,
        'type': 'string',
        'icon': ''
      },
      'Title': {
        'field': 'Title',
        'path': 'cohortName',
        'primary': true,
        'display': true,
        'rowspan': 2,
        'colspan': 1,
        'type': 'string',
        'icon': ''
      },
      'Participants': {
        'field': 'Participants',
        'path': 'totalEnrollment',
        'primary': true,
        'display': true,
        'rowspan': 2,
        'colspan': 1,
        'type': 'string',
        'icon': ''
      },
      'Enrollment Period': {
        'field': 'Enrollment Period',
        'path': 'enrollmentPeriod',
        'primary': true,
        'display': true,
        'rowspan': 2,
        'colspan': 1,
        'type': 'string',
        'icon': ''
      },
      'Data Types': {
        'field': 'Data Types',
        'path': 'endDate',
        'primary': true,
        'display': true,
        'rowspan': 1,
        'colspan': 5,
        'type': 'string',
        'icon': ''
      },
      'data1': {
        'field': 'data1',
        'path': 'dataTypes.biospecimens',
        'primary': false,
        'display': true,
        'rowspan': 1,
        'colspan': 1,
        'type': 'boolean',
        'icon': 'icon-common icon-flask'
      },
      'data2': {
        'field': 'data2',
        'path': 'dataTypes.environmentalData',
        'primary': false,
        'display': true,
        'rowspan': 1,
        'colspan': 1,
        'type': 'boolean',
        'icon': 'icon-common icon-stethoscope'
      },
      'data3': {
        'field': 'data3',
        'path': 'dataTypes.genomicData',
        'primary': false,
        'display': true,
        'rowspan': 1,
        'colspan': 1,
        'type': 'boolean',
        'icon': 'icon-species icon-human'
      },
      'data4': {
        'field': 'data4',
        'path': 'dataTypes.phenotypicData',
        'primary': false,
        'display': true,
        'rowspan': 1,
        'colspan': 1,
        'type': 'boolean',
        'icon': 'icon-species icon-virus'
      },
      'data5': {
        'field': 'data5',
        'path': 'dataTypes.other',
        'primary': false,
        'display': true,
        'rowspan': 1,
        'colspan': 1,
        'type': 'boolean',
        'icon': 'icon-common icon-plus'
      }
    };
  }
}
