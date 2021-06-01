import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  @ViewChild('txtSearch') txtSearch: ElementRef<HTMLInputElement>;

  searchHandler() {
    // console.log(this.txtSearch.nativeElement.value)
    this.txtSearch.nativeElement.value = '';
  }

}
