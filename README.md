# NFL

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Implementation details

I have used Angular Material for styling and some components such as tabels, input fields, loaders.

The application is strucured in 2 main modules, a shared one which incldes the loader and menu, used in all the other components and the main module which contains the components requested. The top bar is used for navigation between components.

Each component makes a server call which returns a list of specific elements which are displayed in a material table. Filtering is done as requested, pagination is there to help with readability. For the timeline firstly tou have to select a crime category using a drop down select populated with the types of crimes. Filtering by date is then possible.

I didn't have time to integrate the date filtering into all the other components. To achieve this, I would've created another shared component in the shared module, and place it in every component. The start date and end date would be stored as observable and the rest of the components will subscribe and therefore when the component will be accessed the server call will also include the start and end date parameters, already showing the filtered data.
