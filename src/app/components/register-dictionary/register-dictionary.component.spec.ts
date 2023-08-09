import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDictionaryComponent } from './register-dictionary.component';

describe('RegisterDictionaryComponent', () => {
  let component: RegisterDictionaryComponent;
  let fixture: ComponentFixture<RegisterDictionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDictionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
