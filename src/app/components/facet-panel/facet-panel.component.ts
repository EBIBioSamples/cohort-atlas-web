import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CohortService} from "../../service/cohort.service";
import {Router} from "@angular/router";
import {FacetService} from "../../service/facet.service";
import {Facet, Filter} from "../../models/facet";

@Component({
  selector: 'app-facet-panel',
  templateUrl: './facet-panel.component.html',
  styleUrls: ['./facet-panel.component.scss']
})
export class FacetPanelComponent implements OnInit {
  @Output() applyFilterEvent = new EventEmitter<String>();

  filterFormGroup = this._formBuilder.group({});
  filters: Filter[] = [];
  facets: Facet[];

  constructor(private router: Router, private _formBuilder: FormBuilder,
              private cohortService: CohortService, private facetService: FacetService) {
  }

  ngOnInit(): void {
    this.facetService.getFacets("", null).subscribe(data => {
      this.facets = data;
      for (let facet of this.facets) {
        let fg = new FormGroup({});
        for (let value of facet.values) {
          fg.addControl(value.label, new FormControl(false));
        }
        this.filterFormGroup.addControl(facet.category, fg);
      }
    });
  }

  clearFilters() {
    this.filters = [];
    this.filterFormGroup.reset();
    this.applyFilterEvent.emit("");
  }

  applyFilters() {
    this.filters = [];
    for (let facet of this.facets) {
      for (let facetValue of facet.values) {
        if (this.filterFormGroup.controls[facet.category].get(facetValue.label).value) {
          this.filters.push({"category": facet.category, "searchPath": facet.searchPath, "value": facetValue.label})
        }
      }
    }

    let queryParam = "";
    for (let filter of this.filters) {
      queryParam += "filter=" + filter.searchPath + ":" + filter.value + "&";
    }
    this.applyFilterEvent.emit(queryParam);
  }
}
