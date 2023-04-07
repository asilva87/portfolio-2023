# Portfolio2023

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

========================================

# ng generate guard --------------------
The command `ng generate guard` is used to generate a new guard service in an Angular application. A guard is a service that determines whether or not a user is authorized to access a particular route in the application.

The `ng generate guard` command creates a new file with the specified name under the "app" directory, and adds the necessary code to make the guard service work. The generated guard class implements the `CanActivate` interface, which allows it to be used to protect routes in the application.

By default, the `ng generate guard` command creates a guard service with a `canActivate()` method that always returns `true`. However, you can customize the implementation of this method to perform any kind of authorization check that your application requires.

# Example
`ng generate guard auth`

```javascript
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
```

In Angular, `ActivatedRouteSnapshot`, `RouterStateSnapshot`, and `UrlTree` are all related to the Angular Router module and are used to manage the navigation and routing within an Angular application.

`ActivatedRouteSnapshot` is an object that contains the current route state. It provides information about the current route, including the URL segments, query parameters, and route parameters. It is used to access the current route's data and resolve any route-level data that is needed before the route is activated.

`RouterStateSnapshot` is an object that represents the current state of the router. It contains a tree of the currently activated routes and provides information about the current route, including the URL segments, query parameters, and route parameters. It is used to inspect the current state of the router and to navigate to new routes.

`UrlTree` is an object that represents a URL and is used to manipulate and parse URLs within the router. It provides methods for creating, manipulating, and parsing URLs. It is used by the router to match URLs to routes and to generate URLs for navigating to different routes.

Together, these objects are used to manage the routing and navigation within an Angular application, including determining which component should be displayed based on the current URL, passing data between components via route parameters, and navigating to different routes within the application.