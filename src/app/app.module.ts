import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatExpansionModule, MatExpansionPanel} from "@angular/material/expansion";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {RegisterComponent} from './pages/register/register.component';
import {HttpClientModule} from "@angular/common/http";
import {HarmoniseComponent} from './pages/harmonise/harmonise.component';
import {CohortComponent} from './pages/cohort/cohort.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableComponent} from './components/table/table.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatStepperModule} from "@angular/material/stepper";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {FacetPanelComponent} from './components/facet-panel/facet-panel.component';
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import {CohortsComponent} from './pages/cohorts/cohorts.component';
import {AboutComponent} from './pages/about/about.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from '@angular/material/chips';
import {MatMenuModule} from "@angular/material/menu";
import {MatRadioModule} from "@angular/material/radio";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    HarmoniseComponent,
    CohortComponent,
    FooterComponent,
    HeaderComponent,
    TableComponent,
    FacetPanelComponent,
    CohortsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    FormsModule,
    MatTableModule,
    MatButtonToggleModule,
    MatIconModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDividerModule,
    MatButtonModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatMenuModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
