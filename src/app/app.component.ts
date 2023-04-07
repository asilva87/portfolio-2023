import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio-2023';
}

// The "styleUrls" property in the @Component decorator is in the plural because it can accept an array
// of stylesheets to include in the component. This allows you to separate its styles into multiple
// files for organization and better maintainability.

// For example, if you have two stylesheets, "app.component.css" and "app.component.mobile.css", you can
// define styleUrls as an array with both files:
//
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css', './app.component.mobile.css']
// })