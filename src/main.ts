import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch(err => console.error(err))

// The "main.ts" file is the entry point of an Angular application. It is responsible for bootstrapping
// the application module, which is defined in the "AppModule" file.

// The "platformBrowserDynamic()" function is used to create a platform for running the application in a
// browser environment, and the "bootstrapModule()" function is used to bootstrap the root module of the
// application, which is AppModule in this case.

// The "catch()" method is used to catch any errors that may occur during the bootstrap process and log
// them to the console.

// In summary, "main.ts" sets up the environment for the application to run in a browser, and then bootstraps
// the root module of the application to start it up.
