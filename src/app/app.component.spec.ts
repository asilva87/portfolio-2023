import { TestBed, ComponentFixture } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'

describe('AppComponent', () => {
	let component: AppComponent
	let fixture: ComponentFixture<AppComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [AppComponent],
		}).compileComponents()
	})

	it('should create the app', () => {
		fixture = TestBed.createComponent(AppComponent)
		component = fixture.componentInstance
		expect(component).toBeTruthy()
	})
	// In the given test case, "fixture.detectChanges()" is not called because it is not required to test the
	// creation of the component instance.
	// Here, "TestBed.createComponent()" method is used to create an instance of the "AppComponent" and then
	// "fixture.componentInstance" is used to get the instance of the component. Finally, "expect(component).toBeTruthy()"
	// is used to assert that the component instance is truthy or not, which means the component is successfully
	// created or not.
	// Calling "fixture.detectChanges()" in this test case is not needed because there are no bindings or changes
	// that would require detection by Angular's change detection system.

	it(`should have as title 'portfolio-2023'`, () => {
		fixture = TestBed.createComponent(AppComponent)
		component = fixture.componentInstance
		expect(component.title).toEqual('portfolio-2023')
	})

	it('should render title', () => {
		fixture = TestBed.createComponent(AppComponent)
		fixture.detectChanges()
		const compiled = fixture.nativeElement as HTMLElement
		expect(compiled.querySelector('.content span')?.textContent).toContain(
			'portfolio-2023 app is running!'
		)
	})
})

// "TestBed" is a utility provided by Angular for testing Angular applications. It provides a test environment
// and infrastructure to create and run tests on Angular components, services, and other features.
// "TestBed" creates a module environment that allows you to simulate the real Angular module environment and its
// behavior. It provides a way to create a test module that contains all the necessary dependencies required to
// test your component, such as services, pipes, and directives.
// Here, the "beforeEach" function is typically imported from the @angular/core/testing module. This function is
// used to set up the test environment before each test is run. Here it declares de "AppComponent".
// The "compileComponents" function is also called to compile the component's template before the tests run.

// In Angular testing, a "fixture" is an object that allows you to interact with a component under test. It provides
// a way to create and manipulate a component instance in a test environment. The fixture also provides access to
// the component's DOM elements, allowing you to test the component's behavior and view.
// The TestBed API in Angular allows you to create a fixture for a component. The fixture is created using the
// "createComponent" method of the TestBed API. Once the fixture is created, you can access the component instance
// using the "componentInstance" property of the fixture object.

// In line 31, even though the component code has not changed, calling "fixture.detectChanges()" triggers change
// detection in the Angular application. Change detection is the process by which Angular updates the view with any
// changes to the component data or state. In this case, the fixture is created for the component being tested,
// and calling "fixture.detectChanges()" is a way to initialize the component and ensure that any bindings, directives,
// or other aspects of the component that depend on change detection are properly initialized.
// So, while it may appear that nothing has changed in the component, calling "fixture.detectChanges()" ensures that
// the component is fully initialized and ready for testing.

// About Angular's Change Detection System ============================================================================
// Angular's change detection system is a mechanism that determines when the view of an Angular application should be
// updated based on the changes in the application state. It checks for changes in the application state and updates
// the view accordingly.

// Angular uses a "unidirectional data flow model", where data flows from the component class to the template. Whenever
// the component state changes, the change detection system detects these changes and updates the template accordingly.

// Angular provides two change detection strategies: "Default" and "OnPush". The "default change detection strategy"
// checks the component state and all its children components in every change detection cycle, while the "OnPush change
// detection strategy" only checks the component's state and its children components when their inputs change.

// By default, Angular uses the "default change detection strategy" for all components. However, when the "OnPush change
// detection strategy" is used, it can lead to better performance in large applications by reducing the number of
// unnecessary checks.

// You  can also trigger the change detection manually using the "ChangeDetectorRef" API, which can be useful in certain
// scenarios, such as after asynchronous operations that modify the component state.

// Overall, the Angular change detection system is a key feature of the framework that allows for efficient and effective
// rendering of views based on changes in the application state.

// The "change detection strategy" is set on a per-component basis in the component's TypeScript file. The
// "ChangeDetectionStrategy" enum is imported from @angular/core, and it is used to set the "changeDetection" property
// of the @Component decorator. For example:
//
// import { Component, ChangeDetectionStrategy } from '@angular/core';
//
// @Component({
//   selector: 'app-my-component',
//   templateUrl: './my-component.component.html',
//   changeDetection: ChangeDetectionStrategy.OnPush // Set the change detection strategy
// })
// export class MyComponent {
//   // Component logic
// }
