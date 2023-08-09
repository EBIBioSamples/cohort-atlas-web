import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {RegisterComponent} from "./pages/register/register.component";
import {HarmoniseComponent} from "./pages/harmonise/harmonise.component";
import {CohortsComponent} from "./pages/cohorts/cohorts.component";
import {AboutComponent} from "./pages/about/about.component";
import {CohortComponent} from "./pages/cohort/cohort.component";
import {RegisterAdditionalComponent} from "./components/register-additional/register-additional.component";
import {RegisterDictionaryComponent} from "./components/register-dictionary/register-dictionary.component";

const routes: Routes = [
  { path: '', component: CohortsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cohorts', component: CohortsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'harmonise', component: HarmoniseComponent },
  { path: 'about', component: AboutComponent },
  { path: 'cohort', component: CohortComponent },
  { path: 'test', component: RegisterAdditionalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
