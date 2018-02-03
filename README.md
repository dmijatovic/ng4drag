# ng5flatpickr demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.4.
It is used to test implementation of flatpickr library in an Angular 5 project. On the flatpickr website you can find an excellent documentation and lot of examples. This project is used to practice these examples and combine them in the way I need them in mine projects. Using separate project for testing ensures that no other 'third party libraries' scripts interferre / influence the outcome of test. If during integration into a project the outcome/output differs from this test we can be certain that some other library influences performance of flatpickr.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## [Flatpickr](https://chmln.github.io/flatpickr/)

flatpickr is a lightweight and powerful datetime picker. Lean, UX-driven, and extensible, yet it doesn’t depend on any libraries. There’s minimal UI but many themes. Rich, exposed APIs and event system make it suitable for any environment. More info is available at [flatpickr repo](https://chmln.github.io/flatpickr/).

For integration follow the steps in documentation except for CSS integration. In our case we will pull styles from local node_module dir into out main.scss file. 

