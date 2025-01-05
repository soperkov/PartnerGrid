PartnerGrid Application
Welcome to the PartnerGrid Application repository! This application allows users to manage insurance partners and policies efficiently. It also contains the solution for the second task, Parking System, within the same repository.

Table of Contents
Getting Started
Features
Second Task: Parking System
Project Structure
Technologies Used
Contributing
License
Getting Started
Follow these steps to set up and run the application on your local machine:

Step 1: Set Up the Database
Navigate to the folder PartnerGrid/Databases.
Execute the SQL scripts in your preferred database management system to create the required database schema and seed data.
Step 2: Configure Application Settings
Open the appsettings.json file located in the PartnerGrid project.
Update the Server name under the ConnectionStrings section to match your database server configuration:
json
Copy code
"ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=PartnerGrid;Trusted_Connection=True;MultipleActiveResultSets=true"
}
Step 3: Run the Project
Open the solution in your IDE (e.g., Visual Studio).
Restore NuGet packages and run the application.
Open your browser and navigate to http://localhost:4200 to access the application.
Features
Partner Management
Create, view, edit, and delete insurance partners.
Highlight partners based on certain criteria.
Policy Management
Add and view policies for partners.
Manage policies through a clean, responsive UI.
UI/UX
Stylish and responsive design with Bootstrap 4 and custom theming.
Modal-based dialogs for ease of use.
Second Task: Parking System
The second task is also included in this repository. The Parking System solution contains:

Diagrams:
Workflow and system design diagrams.
Database Schema:
SQL scripts for the database design.
Solution:
The fully implemented Parking System project.
How to Access:
Navigate to the ParkingSystem folder in the repository.
Review the provided documentation, database schema, and solution code.
Follow the instructions in the ParkingSystem folder to set up and run the project.
Project Structure
plaintext
Copy code
PartnerGrid/
├── PartnerGrid/
│   ├── Controllers/
│   ├── Models/
│   ├── Views/
│   ├── Databases/  # SQL scripts for the database
│   └── appsettings.json
├── ParkingSystem/  # Second Task
│   ├── Diagrams/
│   ├── DatabaseSchema/
│   └── Solution/
└── README.md
Technologies Used
Backend: ASP.NET Core Web API
Frontend: Angular 12
Database: SQL Server
ORM: Dapper
Styling: Bootstrap 4
