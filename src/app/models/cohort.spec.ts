import {Cohort, CohortTableBuilder, EmbeddedCohort} from './cohort';
import {TestBed} from "@angular/core/testing";
import {TableComponent} from "../components/table/table.component";
import {Links, Page, PageModel} from "./PageModel";


describe('Cohort', () => {
  let tableBuilder: CohortTableBuilder;

  beforeAll(() => {
    let pageModel = new PageModel<EmbeddedCohort>();
    let pageData = new EmbeddedCohort();
    pageData.cohorts = [];
    pageModel._embedded = pageData;
    pageModel._links = new Links();
    pageModel.page = new Page();
    tableBuilder = new CohortTableBuilder(pageModel);
  });

  it('should create an instance', () => {
    expect(new Cohort()).toBeTruthy();
  });

  it('getTableHeaders should return table headers without split columns', () => {
    let expectedHeaders = ['Acronym', 'Title', 'Participants', 'Enrollment Period', 'data1', 'data2', 'data3', 'data4', 'data5'];
    expect(tableBuilder.getTableHeaders()).toEqual(expectedHeaders);
  });

  it('getHeaderNames should return only primary headers', () => {
    let expectedHeaders = ['Acronym', 'Title', 'Participants', 'Enrollment Period', 'Data Types'];
    expect(tableBuilder.getHeaderNames()).toEqual(expectedHeaders);
  });

  it('getSubHeaderNames should return only secondary headers', () => {
    let expectedHeaders = ['data1', 'data2', 'data3', 'data4', 'data5'];
    expect(tableBuilder.getSubHeaderNames()).toEqual(expectedHeaders);
  });
});
