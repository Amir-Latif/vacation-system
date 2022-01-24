# Vacation System

Vacation System is a web application that provides a vaction system for employees

## Installation

1. Clone the code
2. Make sure you have the necessary environments instlaled in your system; .NET 6 & Node 16
3. Run ```cd ClientApp/``` then ```yarn install``` to install the front end dependencies
4. Run ```cd ..``` then the folowing command
```dotnet tool install --global dotnet-ef```\
then run the application by\
```dotnet run```

## Workflow
* The entry page of the application comes after the login process
* The application uses a user ID (1) as a default id to render the application, and it should retrieve the use ID from a ```session/localStorage``` or a cookie.
* The employee profile is shown on the left pane
* On the right side the employee submits a new vacation request and it is recorded in the database where official holidays and previously taken days are not taken into account
* The employee can also opt to view a history of his requests
- The requests are displayed as delivered before without subtracting the repeated days within the request
- Only if all days in a request are repeated, the whole request will be discarded and not stored in the database

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
