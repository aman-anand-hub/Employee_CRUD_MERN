##Employee Management System
This project is a simple employee management system built with React for the frontend and Node.js with Express for the backend. It allows users to add, edit, and delete employee records.

Getting Started
To get started with the project, follow these steps:

Clone the repository:
bash
Copy code
git clone <repository_url>
Install dependencies for both the frontend and backend:
bash
Copy code
cd frontend
npm install
cd ../backend
npm install
Start the backend server:
bash
Copy code
cd backend
npm start
Start the frontend development server:
bash
Copy code
cd frontend
npm start
Open your browser and navigate to http://localhost:3000 to view the app.
Backend Routes
GET /employees
Returns a list of all employees.

POST /employees
Adds a new employee. Requires a JSON payload with the following fields: firstname, lastname, email, department.

PATCH /employees/:id
Updates an existing employee record. Requires a JSON payload with the fields to be updated.

DELETE /employees/:id
Deletes an employee record with the specified ID.

Frontend Features
Add Employee: Clicking the "Add Employee" button opens a modal with a form to add a new employee. Fields include firstname, lastname, email, and department. Form validation ensures all fields are filled.
Edit Employee: Clicking the "Edit" button next to an employee in the table opens a modal with a form prefilled with the employee's details. Allows for editing and saving changes.
Delete Employee: Clicking the "Delete" button next to an employee in the table prompts a confirmation dialog before deleting the employee record.
Pagination: Display only 5 employee records per page in the table with pagination controls.
Dark/Light Mode: Toggle button in the top right corner to switch between dark and light mode for the UI.
