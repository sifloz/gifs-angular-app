import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  get historyLog() {
    return this.gifsSerive.historial;
  }

  constructor(private gifsSerive: GifsService) { }

  searchHandler(item: string) {
    this.gifsSerive.searchGifsHandler(item);
  }

}
