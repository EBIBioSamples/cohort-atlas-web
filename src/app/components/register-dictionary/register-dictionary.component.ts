import {Component, Input, OnInit} from '@angular/core';
import {CohortService} from "../../service/cohort.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-dictionary',
  templateUrl: './register-dictionary.component.html',
  styleUrls: ['./register-dictionary.component.scss']
})
export class RegisterDictionaryComponent implements OnInit {
  @Input() accession: string;
  fileToUpload: File | null = null;
  fileName: string = "";

  constructor(private router: Router, private cohortService: CohortService) { }

  ngOnInit(): void {
  }

  handleFileInput(e: any) {
    this.fileToUpload = e.target.files.item(0);
    this.fileName = this.fileToUpload.name;
  }


  uploadDictionaryFile() {
    if (this.fileToUpload != null && this.accession != null) {
      // this.cohortService.postFile(this.fileToUpload).subscribe(data => {
      this.cohortService.uploadDictionaryFile(this.accession, this.fileToUpload).subscribe(data => {
        this.cohortService.dataDictionary = data;
        this.router.navigate(['/harmonise'], {queryParams: {cohort: this.accession}});
      }, error => {
        console.log(error);
      });
    }
  }

}
