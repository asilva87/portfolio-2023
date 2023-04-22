import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { ClockRowComponent } from './pages/mengenlehreuhr/clock-row/clock-row.component'
import { MengenlehreuhrComponent } from './pages/mengenlehreuhr/mengenlehreuhr.component'
import { NavbarComponent } from './components/navbar/navbar.component'

import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatSelectModule } from '@angular/material/select'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ScriptConverterComponent } from './pages/script-converter/script-converter.component'
import { RomanNumeralsConverterComponent } from './pages/roman-numerals-converter/roman-numerals-converter.component'
import { DisplayCellComponent } from './components/display-cell/display-cell.component'
import { CalculatorComponent } from './pages/calculator/calculator.component'
import { PomodoroTimerComponent } from './pages/pomodoro-timer/pomodoro-timer.component'
import { SieveOfEratosthenesComponent } from './pages/sieve-of-eratosthenes/sieve-of-eratosthenes.component'
import { CurrencyConverterComponent } from './pages/currency-converter/currency-converter.component'
import { VigenereCipherComponent } from './pages/vigenere-cipher/vigenere-cipher.component'

@NgModule({
	declarations: [
		AppComponent,
		ClockRowComponent,
		MengenlehreuhrComponent,
		NavbarComponent,
		ScriptConverterComponent,
		RomanNumeralsConverterComponent,
		DisplayCellComponent,
		CalculatorComponent,
		PomodoroTimerComponent,
		SieveOfEratosthenesComponent,
		CurrencyConverterComponent,
		VigenereCipherComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCardModule,
		MatIconModule,
		MatInputModule,
		MatSelectModule,
		MatSlideToggleModule,
		MatToolbarModule,
		MatTooltipModule,
		MatDividerModule,
		ReactiveFormsModule,
		MatSidenavModule,
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }

// This file is responsible for bootstrapping the application and importing all the necessary modules,
// components, services, and other dependencies. It also defines the "root component" of the application,
// which is usually the "AppComponent".

// The "root component" of the application is defined in the "declarations" array of the @NgModule decorator.
// Here, the "AppComponent" is declared in the "declarations" array and is set as the "bootstrap component"
// in the same @NgModule decorator. This tells Angular to bootstrap the application with the "AppComponent"
// as the root component.

// Here the "declarations" array is used to declare all the components, directives, and pipes that belong to
// this module, while the "imports" array is used to import other modules that are required by the components,
// directives, or pipes in the "declarations" array.
// The "declarations" array is where you list all the components, directives, and pipes that are part of the module.
// These are the building blocks that you will use to create your application. Angular needs to know about them
// so it can create instances of them when they are needed.
// The "imports" array is where you list all the other modules that this module needs to work properly. For
// example, if you need to use the "HttpClientModule" to make HTTP requests, you would import that module in
// the "imports" array.
// In summary, the "declarations" array is for declaring the components, directives, and pipes of the module,
// while the "imports" array is for importing the required dependencies of the module.

// The "providers" array in the @NgModule decorator is used to register services, which are a type of injectable
// class in Angular. Services are a way to share code and data across multiple components, directives, or other
// services in an application.
// By registering a service in the "providers" array of an @NgModule decorator, you make that service available
// to all the components, directives, and other services that are declared in that module. This allows you to
// create a centralized place for your application's services and ensure that they are easily accessible throughout
// the application.
// "Services" can be created with the @Injectable decorator in TypeScript, which allows them to be injected into
// other classes as dependencies. When a component or another service requires a service, it can simply include
// it in its constructor and Angular's dependency injection system will provide an instance of the service.
// In summary, the "providers" array is used to register services in an Angular application, making them available
// for dependency injection across the application.

// The "bootstrap" array in the AppModule is used to specify the component that should be bootstrapped when the
// Angular application starts. This means that the specified component will be the first component to be rendered
// in the application.
// The "bootstrap" array is used only once in the whole application, specifically here in the AppModule. It is
// typically set to the "root component" of the application, which is usually the AppComponent. The "bootstrap"
// array takes an array of components to bootstrap. This is typically only one component, and it is the first
// component that is loaded when the application starts.
