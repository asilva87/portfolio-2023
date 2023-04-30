import { Component, OnInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { routes } from './app-routing.module'
import { FormatStringService } from './services/format-string.service'
import { forkJoin, map } from 'rxjs'

import { colors } from './colors'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	public title = 'André Silva - Portfolio 2023'
	public sideNavLinks = [
		'/mengenlehreuhr',
		'/script-converter',
		'/roman-numerals-converter',
		'/pomodoro-timer',
		'/sieve-of-eratosthenes',
		'/currency-converter',
	]
	public showSideNav = false
	public currentUrl = ''
	public backgroundColor = ''
	public routesLocal: Record<string, string>[] = []

	constructor(
		private router: Router,
		formatStringService: FormatStringService
	) {
		const routesLocal = routes.map((route: any) => {
			const name$ = formatStringService.removeHyphens(route.path)

			return forkJoin([name$]).pipe(
				map(([name]) => {
					return {
						...route,
						path: `/${route.path}`,
						name,
					}
				})
			)
		})

		forkJoin(routesLocal).subscribe(routes => {
			this.routesLocal = routes
		})
	}

	ngOnInit() {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.currentUrl = event.url

				switch (event.url) {
					case '/':
						this.backgroundColor = colors.SPL_PLUM_PURPLE;
						break;
					case '/about':
						this.backgroundColor = 'green';
						break;
					case '/contact':
						this.backgroundColor = 'blue';
						break;
					default:
						this.backgroundColor = 'white';
						break;
				}
			}
		})
	}

	public toggleSideNav(status: boolean, route?: string) {
		this.showSideNav = status
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
