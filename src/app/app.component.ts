import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	public title = 'André Silva - Portfolio 2023';
	public showSideNav = false;
	public currentUrl = '';

	constructor(private router: Router) {}

	ngOnInit() {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.currentUrl = event.url;
			}
		});
	}

	ngOnDestroy() {}

	public toggleSideNav() {
		this.showSideNav = !this.showSideNav;
	}
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
