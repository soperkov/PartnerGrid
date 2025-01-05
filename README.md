# PartnerGrid Application

Welcome to the **PartnerGrid Application** repository! This application allows users to manage insurance partners and policies efficiently. It also includes the solution for the second task, **Parking System**, located within the same repository.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Second Task: Parking System](#second-task-parking-system)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

---

## Getting Started

Follow these steps to set up and run the application on your local machine:

### **Step 1: Set Up the Database**

1. Navigate to the folder `PartnerGrid/Databases`.
2. Execute the SQL scripts in your preferred database management system to create the required database schema and seed data.

---

### **Step 2: Configure Application Settings**

1. Open the `appsettings.json` file located in the **PartnerGrid** project.
2. Update the `Server` name under the `ConnectionStrings` section to match your database server configuration:
   ```json
   "ConnectionStrings": {
       "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=PartnerGrid;Trusted_Connection=True;MultipleActiveResultSets=true"
   }

---

## Features

### Partner Management
- Create, view, edit, and delete insurance partners.
- Highlight partners based on specific criteria (e.g., policy count or total policy amount).

### Policy Management
- Add and view policies for partners.
- Clean, responsive UI for policy management.

### UI/UX
- Stylish and responsive design with Bootstrap 4 and custom theming.
- Modal-based dialogs for ease of use.

---

## Second Task: Parking System

The second task is also included in this repository. The **Parking System** solution contains:

### **Diagrams**
- Workflow and system design diagrams.

### **Database Schema**

### **Pseudocode**

### **How to Access**
1. Navigate to the `ParkingSystem` folder in the repository.
2. Review the provided documentation, database schema, and pseudocode.

---

## Project Structure

```plaintext
PartnerGrid/
├── PartnerGrid.API/  # API Backend
│   ├── Controllers/  # API Controllers
│   ├── Models/       # Data Models
│   ├── Interfaces/   # Interfaces for controllers
│   ├── Databases/    # Database Access with Dapper and SQL scripts for the database
│   ├── Validators/   # Validators for the API
│   ├── appsettings.json
│   └── Program.cs
├── PartnerGrid.UI/  # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   └── styles.css
│   └── angular.json
├── ParkingSystem/  # Second Task
│   ├── PDF/         # Diagrams in PDF format
│   ├── Pseudocode/   # Files containing pseudocode for this project
│   ├── SVG/         # Diagrams in SVG format
│   └── Final database schema, diagram and solution
└── README.md
```

---

## Technologies Used

- **Backend**: ASP.NET Core Web App
- **Frontend**: Angular 19
- **Database**: SQL Server
- **ORM**: Dapper
- **Styling**: Bootstrap 4
