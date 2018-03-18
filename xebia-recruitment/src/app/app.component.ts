import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private searchValue;

  constructor() {

  }

  search = (): void => {
    console.log(this);
  }
}
