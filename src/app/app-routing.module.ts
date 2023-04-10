import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MengenlehreuhrComponent } from './pages/mengenlehreuhr/mengenlehreuhr.component';
import { ScriptConverterComponent } from './pages/script-converter/script-converter.component';

const routes: Routes = [
  { path: 'mengenlehreuhr', component: MengenlehreuhrComponent },
  { path: 'script-converter', component: ScriptConverterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// This is the main routing module of an Angular application. It imports the Angular NgModule decorator, 
// as well as the RouterModule and Routes interfaces from @angular/router.

// The "routes" constant defines the routes for the application. These are used to map URLs to components, 
// and to determine which component should be displayed when a user navigates to a particular URL.

// The AppRoutingModule class is an NgModule that defines the "routes" constant, imports the RouterModule
// and initializes it with the "routes" constant using the "forRoot()" method, and exports the RouterModule
// to be used by other modules. By exporting the RouterModule from this module and importing it into the
// "app module", the configured router can be used by the app.

// The "forRoot()" method is a convention used in Angular to provide a configuration for a module that is
// intended to be imported into the root application module (AppModule). It is called this way to emphasize
// that the method is intended to be called only once, at the root of the application.
// In the case of the RouterModule, calling "forRoot()" with the application's routes enables the router 
// service to start listening for URL changes and route navigation events. The RouterModule is a singleton
// service that should be imported into the "root module" only once, hence the use of "forRoot()".

// The fact that "routes" is defined as a constant means that it can be exported from the "app-routing.module.ts"
// file and imported into any other module that needs to use it. Because it is a constant, it will always
// have the same value, so other modules can rely on it being a consistent representation of the application's routes.