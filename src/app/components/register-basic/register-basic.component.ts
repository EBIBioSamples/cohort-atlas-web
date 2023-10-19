import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild, inject} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {CohortService} from "../../service/cohort.service";
import {map, Observable, startWith} from "rxjs";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-register-basic',
  templateUrl: './register-basic.component.html',
  styleUrls: ['./register-basic.component.scss']
})
export class RegisterBasicComponent {
  registerStudyForm: FormGroup;
  @Output() accessionEmitter = new EventEmitter<string>();
  @ViewChild('dataTypesInput') dataTypesInput: ElementRef<HTMLInputElement>;
  @ViewChild('territoriesInput') territoriesInput: ElementRef<HTMLInputElement>;

  TEST_REQUIRED = '';

  separatorKeysCodes: number[] = [ENTER, COMMA];

  dataTypeCtrl = new FormControl('');
  filteredDataTypes: Observable<string[]>;
  selectedDataTypes: string[] = [];
  allDataTypes: string[] = ['Biospecimens', 'Environmental', 'Genomic', 'Phenotypic'];

  territoryCtrl = new FormControl('');
  filteredTerritories: Observable<string[]>;
  selectedTerritories: string[] = [];
  allTerritories: string[] = ['UK', 'France', 'Peru', 'South Africa', 'Qatar', 'Philippine'];

  constructor(private cohortService: CohortService, private formBuilder: FormBuilder) {

    this.filteredDataTypes = this.dataTypeCtrl.valueChanges.pipe(
      startWith(null),
      map((dataType: string | null) => (dataType ? this.filterDataTypeChip(dataType) : this.allDataTypes.slice())),
    );

    this.filteredTerritories = this.territoryCtrl.valueChanges.pipe(
      startWith(null),
      map((territory: string | null) => (territory ? this.filterTerritoryChip(territory) : this.allTerritories.slice())),
    );

    this.registerStudyForm = this.formBuilder.group({
      cohortName: ['', Validators.required],
      acronym: ['', Validators.required],
      description: ['', this.TEST_REQUIRED],
      website: [''],
      license: ['', this.TEST_REQUIRED],

      startDate: ['', this.TEST_REQUIRED],
      endDate: [''],
      targetEnrollment: [''],
      totalEnrollment: ['', this.TEST_REQUIRED],
      studyDesign: ['', this.TEST_REQUIRED],
      territories: this.formBuilder.array([
        // this.formBuilder.control('')
      ]),

      funding: [''],
      acknowledgements: [''],

      provider: this.formBuilder.group({
        name: ['', this.TEST_REQUIRED],
        description: ['', this.TEST_REQUIRED],
        website: [''],
        acronym: [''],
        logo: [''],
        contacts: [''],
        resources: ['']
      }),

      dataTypes: this.formBuilder.array([
        // this.formBuilder.control('')
      ]),

      publications: this.formBuilder.array([
        this.formBuilder.group({
          title: [''],
          doi: ['']
        })
      ]),

      contacts: this.formBuilder.array([
        this.formBuilder.group({
          name: ['', this.TEST_REQUIRED],
          email: ['', this.TEST_REQUIRED],
          orcid: [''],
          affiliation: ['', this.TEST_REQUIRED],
          address: [''],
          role: ['', this.TEST_REQUIRED]
        })
      ]),
      investigators: this.formBuilder.array([
        this.formBuilder.group({
          name: ['', this.TEST_REQUIRED],
          email: ['', this.TEST_REQUIRED],
          orcid: [''],
          affiliation: ['', this.TEST_REQUIRED],
          address: [''],
          role: ['', this.TEST_REQUIRED]
        })
      ])
    });
  }

  addDataTypeChip(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.selectedDataTypes.push(value);
      this.addDataType(value);
    }
    event.chipInput!.clear();
    this.dataTypeCtrl.setValue(null);
  }

  removeDataTypeChip(dataType: string): void {
    // this.dataTypes.indexOf('')
    const index = this.selectedDataTypes.indexOf(dataType);
    if (index >= 0) {
      this.selectedDataTypes.splice(index, 1);
    }
  }

  selectedDataTypeChip(event: MatAutocompleteSelectedEvent): void {
    this.selectedDataTypes.push(event.option.viewValue);
    this.addDataType(event.option.viewValue);
    this.dataTypesInput.nativeElement.value = '';
    this.dataTypeCtrl.setValue(null);
  }

  private filterDataTypeChip(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allDataTypes.filter(dataType => dataType.toLowerCase().includes(filterValue));
  }

  addTerritoryChip(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.selectedTerritories.push(value);
      this.addTerritory(value);
    }
    event.chipInput!.clear();
    this.territoryCtrl.setValue(null);
  }

  removeTerritoryChip(territory: string): void {
    const index = this.selectedTerritories.indexOf(territory);
    if (index >= 0) {
      this.selectedTerritories.splice(index, 1);
    }
  }

  selectedTerritoryChip(event: MatAutocompleteSelectedEvent): void {
    this.selectedTerritories.push(event.option.viewValue);
    this.addTerritory(event.option.viewValue);
    this.territoriesInput.nativeElement.value = '';
    this.territoryCtrl.setValue(null);
  }

  private filterTerritoryChip(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTerritories.filter(territory => territory.toLowerCase().includes(filterValue));
  }


  createNewCohort() {
    console.warn('Creating a new cohort: ', this.registerStudyForm.value);
    this.cohortService.registerCohort1(this.registerStudyForm.value)
      .subscribe((response) => {
        console.log("registered" + JSON.stringify(response));
        console.log("cohort: " + response["accession"]);
        this.accessionEmitter.emit(response["accession"]);
      });
  }

  get territories() {
    return this.registerStudyForm.get('territories') as FormArray;
  }

  addTerritory(territory: string) {
    this.territories.push(this.formBuilder.control(territory));
  }

  get dataTypes() {
    return this.registerStudyForm.get('dataTypes') as FormArray;
  }

  addDataType(dataType: string) {
    this.dataTypes.push(this.formBuilder.control(dataType));
  }

  get publications() {
    return this.registerStudyForm.get('publications') as FormArray;
  }

  addPublication() {
    this.publications.push(this.formBuilder.group({
      title: [''],
      doi: ['']
    }));
  }

  get contacts() {
    return this.registerStudyForm.get('contacts') as FormArray;
  }

  addContact() {
    this.contacts.push(this.formBuilder.group({
      name: [''],
      email: [''],
      orcid: [''],
      affiliation: [''],
      address: [''],
      role: ['']
    }));
  }

  get investigators() {
    return this.registerStudyForm.get('investigators') as FormArray;
  }

  addInvestigator() {
    this.investigators.push(this.formBuilder.group({
      name: [''],
      email: [''],
      orcid: [''],
      affiliation: [''],
      address: [''],
      role: ['']
    }));
  }


}
