#### Task 1-A
1. What is done well?
	- Use of FormBuilder, FormGroup, Validators for form validations in stocks component.
	- Use of angular material and google chart which provides various predefined common functionality which we can inject and use. It will save developers efforts.
	- Use of ngrx app state management which improve the application performance.
2. What would you change?
	- Will add access modifiers. Most of the components does not have access modifiers for class members(function and variables)
	- Remove any data type from all components.
	- We can create interfaces and use as type for class variables which holds the object/json data in all components. 
	- Remove hardcoded values in html files, components files and in spec test files by using constant, enums and mock data files. 
	- We have to unsubscribe subscription on chart component or we can use '| async' of ngrx to pass observable chart data from stock component to chart component 
3. Are there any code smells or problematic implementations?
	- graph will not be displayed on UI as chart component does not have 'data' property.

> Make a PR to fix at least one of the issues that you identify
