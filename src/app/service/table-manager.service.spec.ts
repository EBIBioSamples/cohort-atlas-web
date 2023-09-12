import { TestBed } from '@angular/core/testing';

import { TableManagerService } from './table-manager.service';

describe('TableManagerService', () => {
  let service: TableManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getChildElementValue should return correct child element for simple paths', () => {
    let testObject = {
      "field_1": "value_1",
      "field_2": {
        "sub_field_1": "sub_value_1",
        "sub_field_2": "sub_value_2",
      }
    }
    let testPath = "field_2.sub_field_2";
    expect(service.getChildElementValue(testObject, testPath)).toBe("sub_value_2");
  });
});
