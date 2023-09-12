import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryDialogComponent } from './dictionary-dialog.component';

describe('DictionaryDialogComponent', () => {
  let component: DictionaryDialogComponent;
  let fixture: ComponentFixture<DictionaryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictionaryDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictionaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
